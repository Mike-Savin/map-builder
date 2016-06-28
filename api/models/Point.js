module.exports = {
  attributes: {
    x: {
      type: 'integer',
      required: true
    },

    y: {
      type: 'integer',
      required: true
    },

    z: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    type: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    date: {
      type: 'datetime',
      required: true
    },

    map: {
      model: 'Map',
      required: true
    }
  }
};