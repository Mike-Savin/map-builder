module.exports = {
  models: {
    connection: 'production'
  },
  connections: {
    production: {
      adapter: 'sails-mongo',
      host: 'ds029725.mlab.com',
      port: 29725,
      user: 'heroku_dcftb3ds',
      password: 'heroku_dcftb3ds',
      database: 'heroku_dcftb3ds'
    }
  },
  port: 80
};
