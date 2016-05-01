module.exports = {
  attributes: {
    name: {
      type: 'string'
    },

    points: {
      collection: 'Point',
      via: 'map'
    }
  }
};