module.exports.bootstrap = function(cb) {
  require('express-helpers')(sails.hooks.http.app);
  require('dotenv').config({path: 'config/env/.' + sails.config.environment});

  sails.q = require('q');
  sails.uuid = require('uuid');
  sails.crypto = require('crypto-js');
  sails.mandrill = require('machinepack-mandrill');
  sails.moment = require('moment');

  cb();
};
