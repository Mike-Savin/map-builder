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
  },

  validationMessages: {
    x: {
      required: 'SERVER.ERROR.X.REQUIRED'
    },
    y: {
      required: 'SERVER.ERROR.Y.REQUIRED'
    },
    type: {
      required: 'SERVER.ERROR.TYPE.REQUIRED'
    },
    date: {
      required: 'SERVER.ERROR.DATE.REQUIRED',
      datetime: 'SERVER.ERROR.DATE.INVALID'
    },
    map: {
      required: 'SERVER.ERROR.MAP.REQUIRED'
    }
  }
};