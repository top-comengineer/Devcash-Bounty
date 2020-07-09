module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }    
  }
};