module.exports.bootstrap = function(cb) {
  require('express-helpers')(sails.hooks.http.app);
  cb();
};
