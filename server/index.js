const express = require('express');
const cron = require("node-cron");
var Sequelize = require('sequelize');
const { Nuxt, Builder } = require('nuxt')
const { EtherClient } = require("./utils/ether_client")
const { RedisDB } = require("./redis")
const { verifyAndReleaseBounties, verifyAndReleaseSubmissions, verifyAndReleaseRevisions } = require("./utils/release_data")

// DB Models
const models = require("./models");

// Routes
const ubountyRouter = require('./routes/bounty');
const submissionRouter = require('./routes/submission');
const revisionRouter = require('./routes/revision');

// App
const app = express();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Other middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // Setup API routes
  app.use('/bounty', ubountyRouter);
  app.use('/submission', submissionRouter);
  app.use('/revision', revisionRouter);

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

function setupEthersJobs() {
  // Setup cron for verifying data
  EtherClient.init().then(async etherClient => {
    // Every 5 minutes update on-chain bounty cache 
    cron.schedule("*/5 * * * *", async function() {
      await redis.updateBountyCache(etherClient)
    });
    // Listen to bounty event to confirm it
    etherClient.uBCContract.on("created", async (uBountyIndex, event) => {
      console.log(`Bounty ${uBountyIndex} created`)
      // Retrieve bounty from chain
      let uBounty = await etherClient.getUBounty(uBountyIndex)
      // Verify and release from staging tables
      await verifyAndReleaseBounties([uBounty])
    })
    // Listen to submitted event
    etherClient.uBCContract.on("submitted", async (uBountyIndex, submissionIndex, event) => {
      console.log(`Submission ${submissionIndex} created`)
      // Retrieve bounty and submission with hashes
      let uBounty = await etherClient.getUBounty(uBountyIndex)
      uBounty.submissions.forEach(async submission => {
        if (submission.index == submissionIndex) {
          await verifyAndReleaseSubmissions([submission])
        }
      })
    })
    // Listen to revision event
    etherClient.uBCContract.on("revised", async (uBountyIndex, submissionIndex, revisionIndex, event) => {
      // Retrieve bounty
      console.log(`Revision ${revisionIndex} created`)
      // Retrieve bounty and revisions with hashes
      let uBounty = await etherClient.getUBounty(uBountyIndex)
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
    })
    // Fallback for missed events
    // TODO - change to more reasonable schedule, 1 minute is for testing
    cron.schedule("* * * * *", async function() {
      let uBounties = await redis.getUBounties()
      await verifyAndReleaseBounties(uBounties)
      uBounties.forEach(async uBounty => {
        if (uBounty.submissions != undefined && uBounty.submissions.length > 0) {
          await verifyAndReleaseSubmissions(uBounty.submissions)
          uBounty.submissions.forEach(async submission => {
            if (submission.revisions != undefined && submission.revisions.length > 0) {
              await verifyAndReleaseRevisions(submission.revisions)
            }
          })
        }
      })
    })    
  })
}

// Create all tables if they don't exist then start server
models.sequelize.sync().then(function() {
  setupEthersJobs()
  start()
});