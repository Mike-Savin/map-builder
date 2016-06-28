module.exports.policies = {
  '*': false,

  UsersController: {
    'create': true
  },

  UsersSessionsController: {
    'create': true
  },

  MapsController: {
    '*': 'hasToken'
  },

  UsersPasswordsController: {
    '*': true
  }
};
