const express = require('express');
const cron = require("node-cron");
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

// Setup cron for verifying data
EtherClient.init().then(async etherClient => {
  // Every 5 minutes update on-chain bounty cache 
  cron.schedule("*/5 * * * *", async function() {
    await redis.updateBountyCache(etherClient)
  });
})

// Create all tables if they don't exist then start server
models.sequelize.sync().then(function() {
  start()
});