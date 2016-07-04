module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    points: {
      collection: 'Point',
      via: 'map'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    currentX: {
      type: 'integer',
      defaultsTo: 0
    },

    currentY: {
      type: 'integer',
      defaultsTo: 0
    },

    currentAngle: {
      type: 'integer',
      defaultsTo: 90
    },

    owner: {
      model: 'User',
      required: true
    }
  },

  validationMessages: {
    name: {
      required: 'SERVER.ERROR.NAME.REQUIRED'
    }
  }
};