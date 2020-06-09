module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  /* TODO - re-enable
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    //use_env_variable: 'DATABASE_URL',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }    
  }*/
  production: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
};