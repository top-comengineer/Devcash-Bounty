const express = require('express');
const { Nuxt, Builder } = require('nuxt')

// DB Models
const models = require("./models");

// Routes
const testRouter = require('./routes/test');

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
  app.use('/test', testRouter);

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

// Create all tables if they don't exist then start server
models.sequelize.sync().then(function() {
  start()
});