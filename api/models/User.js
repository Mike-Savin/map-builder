var aes = require('crypto-js/aes');

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      unique: true,
      required: true,
      index: true
    },

    password: {
      type: 'string',
      required: true,
      minLength: 8
    },

    resetPasswordToken: {
      type: 'string'
    },

    accessToken: {
      type: 'string',
      index: true
    },

    maps: {
      collection: 'Map',
      via: 'owner'
    },

    robotId: {
      type: 'string',
      required: true
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  validationMessages: {
    name: {
      required: 'SERVER.ERROR.NAME.REQUIRED'
    },
    email: {
      required: 'SERVER.ERROR.EMAIL.REQUIRED',
      email: 'SERVER.ERROR.EMAIL.INVALID',
      unique: 'SERVER.ERROR.EMAIL.EXISTS'
    },
    password: {
      required: 'SERVER.ERROR.PASSWORD.REQUIRED',
      minLength: 'SERVER.ERROR.PASSWORD.TOO_SHORT'
    },
    robotId: {
      required: 'SERVER.ERROR.ROBOT_ID.REQUIRED',
    }
  },

  beforeCreate: function (user, cb) {
    user.password = aes.encrypt(user.password, process.env.SALT).toString();
    user.accessToken = aes.encrypt(user.email, process.env.SALT).toString();
    cb(null, user);
  }
};

