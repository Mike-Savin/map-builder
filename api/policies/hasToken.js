module.exports = function hasToken(req, res, next) {
  var accessToken = req.headers['access-token'];
  if (accessToken) {
    User.findOne({accessToken: accessToken}).then(function (user) {
      if (user) {
        return next();
      }
      return res.unauthorized();
    });
  } else {
    return res.unauthorized();
  }
};