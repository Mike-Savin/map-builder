module.exports = {
  models: {
    connection: 'test',
    migrate: 'drop'
  },
  connections: {
    test: {
      adapter: 'sails-memory'
    }
  },
  log: {
    level: 'silent'
  }
};