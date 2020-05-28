const express = require('express');
const cron = require("node-cron");
var Sequelize = require('sequelize');
const { Nuxt, Builder } = require('nuxt')
const { EtherClient } = require("./utils/ether_client")
const { RedisDB } = require("./redis")

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
      // Retrieve bounty hash
      let uBounty = await etherClient.getUBounty(uBountyIndex)
      // Confirm
      if (uBounty.description != undefined) {

      }
    })
    // Listen to submitted event
    etherClient.uBCContract.on("submitted", async (uBountyIndex, submissionIndex, event) => {
      console.log(`Submission ${submissionIndex} created`)
      // Retrieve bounty and submission with hashes
      let uBounty = etherClient.getUBounty(uBountyIndex)
      let submissionHash = await this.uBCContract.getSubmissionString(uBounty.index, submissionIndex)
      // TODO - move to processed tables
    })
    // Fallback for missed events
    cron.schedule("*/5 * * * *", async function() {
      let uBounties = await redis.getUBounties()
      let hashes = []
      let hashIdMap = {}
      // Get uBounties from blockchain
      uBounties.forEach(async uBounty => {
        hashes.push(uBounty.description)
        hashIdMap[uBounty.description] = uBounty.index
      })
      // Get staged bounties from database
      let stagedBounties = await models.UBounty.findAll({
        where: {
          hash: { [Sequelize.Op.in]: hashes }
        }          
      })
      // Move from staged to prod table
      console.log(`Updating ${stagedBounties.length} bounties`)
      stagedBounties.forEach(async stagedBounty => {
        // Start a transaction
        const t = await sequelize.transaction();
        console.log(`moving staged bounty ${stagedBounty.id} to release table`)
        try {
          // Create bounty if doesn't exist
          let uBountyExists = await models.UBounty.count({where: {hash: stagedBounty.hash}}) > 0
          if (uBountyExists) {
            // Delete
            await models.UBountyStaged.destroy({
              where: {
                hash: stagedBounty.hash
              }
            }, { transaction: t })
          } else {
            // Insert
            await models.UBounty.create({
              id: hashIdMap[stagedBounty.hash],
              creator: stagedBounty.creator,
              hunter: stagedBounty.hunter,
              title: stagedBounty.title,
              description: stagedBounty.description,
              contactName: stagedBounty.contactName,
              contactEmail: stagedBounty.contactEmail,
              hash: stagedBounty.hash           
            }, { transaction: t })
            // Delete
            let destroyed = await models.UBountyStaged.destroy({
              where: {
                hash: stagedBounty.hash
              }
            }, { transaction: t }) > 1
            if (!destroyed) {
              throw new Error(`Failed to destroy uBounty ${stagedBounty.hash}`)
            }
          }
        } catch (error) {
          console.log(`Encountered error updating bountiyes ${error}`)
          t.tollback()
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