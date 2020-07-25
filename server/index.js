const express = require('express');
const cron = require("node-cron");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { Nuxt, Builder } = require('nuxt')
const { etherClient } = require("./utils/ether_client")
const { utils } = require("ethers");
const { RedisDB } = require("./redis")
const { verifyAndReleaseBounties, verifyAndReleaseSubmissions, verifyAndReleaseRevisions } = require("./utils/release_data")

// DB Models
const { sequelize, UBounty, Op, Submission, UBountyStaged, SubmissionStaged } = require("./models");

// Routes
const ubountyRouter = require('./routes/bounty');
const submissionRouter = require('./routes/submission');
const revisionRouter = require('./routes/revision');
const statsRouter = require('./routes/stats');

// App
const app = express();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host } = nuxt.options.server
  let port =3001
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Other middlewares
  app.use(cors())
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 'loopback')
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // Setup API routes
  app.use('/bounty', ubountyRouter);
  app.use('/submission', submissionRouter);
  //app.use('/revision', revisionRouter);
  app.use('/stats', statsRouter)

  // Cookie parser
  app.use(cookieParser())
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

const redis = new RedisDB()

async function setupEthersJobs() {
  // TODO - set sane cron intervals for production

  // Fetch event logs
  await etherClient.gatherEventLogs()
  // Every 5 minutes update on-chain bounty cache 
  cron.schedule("*/5 * * * *", async function() {
    await redis.updateBountyCache(etherClient)
  });
  cron.schedule("*/30 * * * *", async function() {
    await etherClient.gatherEventLogs()
  });  
  // Listen to bounty event to confirm it
  etherClient.uBCContract.on("created", async (uBountyIndex, event) => {
    console.log(`event: Bounty ${uBountyIndex} created`)
    // Retrieve bounty from chain
    let uBounty = await etherClient.getUBounty(uBountyIndex)
    // Update in cache
    await redis.addBounty(uBounty)
    // Verify and release from staging tables
    await verifyAndReleaseBounties([uBounty])
  })
  // Listen to submitted event
  etherClient.uBCContract.on("submitted", async (uBountyIndex, submissionIndex, event) => {
    console.log(`event: Submission ${submissionIndex} created`)
    // Retrieve bounty and submission with hashes
    let uBounty = await etherClient.getUBounty(uBountyIndex)
    // Update in cache
    await redis.addBounty(uBounty)  
    uBounty.submissions.forEach(async submission => {
      if (submission.index == submissionIndex) {
        await verifyAndReleaseSubmissions([submission])
      }
    })
  })
  // Listen to revision event
  /*
  etherClient.uBCContract.on("revised", async (uBountyIndex, submissionIndex, revisionIndex, event) => {
    // Retrieve bounty
    console.log(`Revision ${revisionIndex} created`)
    // Retrieve bounty and revisions with hashes
    let uBounty = await etherClient.getUBounty(uBountyIndex)
    // Update in cache
    await redis.setUBountiesIfNotExistsWithLock([uBounty])
    if (uBounty.submissions != undefined && uBounty.submissions.length > 0) {
      uBounty.submissions.forEach(async submission => {
        if (submission.revisions != undefined && submission.revisions.length > 0) {
          submission.revisions.forEach(async revision => {
            if (revision.index == revisionIndex) {
              await verifyAndReleaseRevisions([revision])
            }
          })
        }
      })    
    }
  })*/
  // Approved
  etherClient.uBCContract.on("approved", async (uBountyIndex, submissionIndex, feedback) => {
    console.log(`event: approved ${uBountyIndex} ${submissionIndex}`)
    etherClient.overrideStatus(uBountyIndex, submissionIndex, "approved", feedback)
    await Submission.update(
      { approved: true },
      {
        where: {
          [Op.and]: [{submission_id: submissionIndex}, {ubounty_id:uBountyIndex}],
        },
      },
    );    
  })
  // Rejected
  etherClient.uBCContract.on("rejected", async (uBountyIndex, submissionIndex, feedback) => {
    etherClient.overrideStatus(uBountyIndex, submissionIndex, "rejected", feedback)
  })    
  // Rewarded
  etherClient.uBCContract.on("rewarded", async (uBountyIndex, submissionIndex, Hunter, tokenAmount, weiAmount) => {
    // event: rewarded 13, 0, 0, 10000000000, 0x41f2909e7442984DEcf8b7516Bb9Bf47ECfd641d
    console.log(`event: rewarded ${uBountyIndex}, ${submissionIndex}, ${weiAmount}, ${tokenAmount}, ${Hunter}`)
    let timestamp = parseInt(new Date().getTime() / 1000)
    let devcashAmount = utils.formatUnits(tokenAmount, 8)
    let ethAmount = utils.formatEther(weiAmount)
    etherClient.event_logs.rewarded.unshift({
      ethRewardAmount: ethAmount,
      ubountyIndex: uBountyIndex,
      submissionIndex: submissionIndex,
      timestamp: timestamp,
      hunter: Hunter,
      rewardAmount: devcashAmount
    })
    // Update cache
    let onChain = await etherClient.getUBounty(uBountyIndex)
    await redis.addBounty(onChain)
  })
  // Reclaimed
  etherClient.uBCContract.on("reclaimed", async (uBountyIndex, tokenAmount, weiAmount) => {
    console.log(`event: reclaimed ${uBountyIndex}, ${weiAmount}, ${tokenAmount}`)
    let timestamp = parseInt(new Date().getTime() / 1000)
    let devcashAmount = utils.formatUnits(tokenAmount, 8)
    let ethAmount = utils.formatEther(weiAmount)
    etherClient.event_logs.reclaimed.unshift({
      ethReclaimedAmount: ethAmount,
      ubountyIndex: uBountyIndex,
      timestamp: timestamp,
      reclaimedAmount: devcashAmount
    })
    // Update cache
    let onChain = await etherClient.getUBounty(uBountyIndex)
    await redis.addBounty(onChain)
  })
  // Fallback for missed events
  // TODO - change to more reasonable schedule, 1 minute is for testing
  cron.schedule("*/3 * * * *", async function() {
    let lock = redis.cronLockerOne
    lock.acquire(`devcash:verifyAndReleaseCron`).then(async () => {
      console.log("Updating bounty cache")
      let uBounties = await redis.getUBounties()
      await verifyAndReleaseBounties(uBounties)
      uBounties.forEach(async uBounty => {
        if (uBounty.submissions != undefined && uBounty.submissions.length > 0) {
          await verifyAndReleaseSubmissions(uBounty.submissions)
          /*
          uBounty.submissions.forEach(async submission => {
            if (submission.revisions != undefined && submission.revisions.length > 0) {
              await verifyAndReleaseRevisions(submission.revisions)
            }
          })*/
        }
      })
      return lock.release();
    }, (err) => {
      console.log(err)
    })    
  })
  // Update bounty statuses and amounts
  cron.schedule("*/5 * * * *", async function() {
    let lock = redis.cronLockerTwo
    lock.acquire(`devcash:updateAmountStatusCron`).then(async () => {
      let curDtS = parseInt(new Date().getTime() / 1000)
      let bounties = await UBounty.findAll({
        where: {
          [Op.and]: [
            {complete: {[Op.eq]: false}},
            {deadline: {[Op.gt]: curDtS}}
          ]
        },
        include: ['submissions']
      })
      bounties.every(async bounty => {
        let onChain = await etherClient.getUBounty(bounty.id)
        let updated = false
        if (onChain) {
          if (bounty.bountyAmount != onChain.amount) {
            bounty.bountyAmount = onChain.amount
            updated = true
          }
          if (bounty.weiAmount != onChain.weiAmount) {
            bounty.weiAmount = onChain.weiAmount
            updated = true
          }
          let complete = bounty.submissions.filter(sub => sub.approved).length == bounty.available
          if (complete) {
            bounty.complete = complete
            updated = true
          }
          if (updated) {
            await bounty.save()
          }
        }
      })
      return lock.release();
    }, (err) => {
      console.log(err)
    })      
  })
  // Delete stale staged records
  cron.schedule("0 * * * *", async function() {
    let yesterday = new Date(Date.now() - 86400 * 1000)
    let destroyedCount = 0
    destroyedCount += await SubmissionStaged.destroy({
      where: {
        createdAt: {[Op.lte]: yesterday}
      }
    })
    destroyedCount += await UBountyStaged.destroy({
      where: {
        createdAt: {[Op.lte]: yesterday}
      }
    })
    console.log(`Destroyed ${destroyedCount} unconfirmed records`)
  })
}

// Create all tables if they don't exist then start server
sequelize.sync().then(_ => {
  etherClient.init(redis).then(_ => {
    setupEthersJobs()
  })
  start()
});