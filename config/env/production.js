module.exports = {
  models: {
    connection: 'production'
  },
  connections: {
    production: {
      adapter: 'sails-mongo',
      url: process.env.MONGOLAB_URI
    }
  },
  port: 80
};
