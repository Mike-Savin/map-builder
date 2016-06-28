module.exports.bootstrap = function(cb) {
  require('express-helpers')(sails.hooks.http.app);

  sails.q = require('q');
  sails.uuid = require('uuid');
  sails.crypto = require('crypto-js');
  sails.mandrill = require('machinepack-mandrill');

  cb();
};
