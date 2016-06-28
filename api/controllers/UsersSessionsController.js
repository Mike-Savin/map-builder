module.exports = {
  create: function (req, res) {
    var error;
    User.findOne({email: req.param('email')}).populate('maps').then(function (user) {
      if (!user) {
        error = 'SERVER.ERROR.EMAIL';//Incorrect email
      }
      if (user && sails.crypto.AES.decrypt(user.password, user.email).toString(sails.crypto.enc.Utf8) !== req.param('password')) {
        error = 'SERVER.ERROR.PASSWORD';//Incorrect password
      }
      if (!error) {
        return res.json({user: user});
      }
      res.error({status: 400, key: error});
    }, function (error) {
      res.error({status: 500, key: error});
    });
  }
};

