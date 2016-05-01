module.exports = {
  models: {
    connection: 'development',
    migrate: 'alter'
  },
  connections: {
    development: {
      adapter: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      database: 'mapbuilder_dev'
    }
  }
};