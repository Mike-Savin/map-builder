module.exports = function hasToken(req, res, next) {
  var accessToken = req.headers['access-token'];
  if (accessToken) {
    User.findOne({accessToken: accessToken}).then(function (user) {
      if (user) {
        req.currentUser = {
          id: user.id,
          email: user.email
        };
        return next();
      }
      res.error({status: 403, key: 'SERVER.ERROR.UNAUTHORIZED'});
    });
  } else {
    res.error({status: 403, key: 'SERVER.ERROR.UNAUTHORIZED'});
  }
};