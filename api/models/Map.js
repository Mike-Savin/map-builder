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

    owner: {
      model: 'User',
      required: true
    }
  },

  validationMessages: {
    name: {
      required: 'SERVER.ERROR.NAME.REQUIRED'
    }
  },

  toJSON: function () {
    var obj = this.toObject();
    return obj.populate('points');
  }
};