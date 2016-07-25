module.exports = {
  models: {
    connection: 'production'
  },
  connections: {
    production: {
      adapter: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      database: 'heroku_dcftb3ds'
    }
  },
  port: 80
};
