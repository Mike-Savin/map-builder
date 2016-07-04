module.exports.policies = {
  '*': false,

  UsersController: {
    'create': true
  },

  UsersSessionsController: {
    'create': true
  },

  UsersPasswordsController: {
    '*': true
  },

  UsersMapsController: {
    '*': 'hasToken'
  },

  'UsersMapsPointsController': {
    '*': 'hasToken'
  }
};
