module.exports = {
  'new': function (req, res) {
    var user;
    User.findOne({email: req.param('email')}).then(function (foundUser) {
      user = foundUser;
      if (user) {
        user.resetPasswordToken = sails.uuid.v1();
        return user.save();
      }
      return false;
    }).then(function () {
      if (user) {
        return Email.send({
          subject: 'Map builder password reset',
          toEmail: user.email,
          fromName: 'Map builder',
          fromEmail: 'mikesavin@outlook.com',
          message: 'Visit this link to change password: ' + process.env.SERVER_HOST +
            '/users/passwords/edit?token=' + user.resetPasswordToken,
          returnItem: user
        });
      }
      return false;
    }).then(function (result) {
      if (result) {
        res.json(200)
      } else {
        res.error({status: 404, key: 'SERVER.ERROR.EMAIL.NOT_FOUND'});
      }
    }, function (error) {
      res.error({status: 500, key: 'SERVER.ERROR.INTERNAL'});
    })
  },

  edit: function (req, res) {
    var token = req.param('token') || 'notatoken',
      data = {model: 'users'};
    User.findOne({resetPasswordToken: token}).then(function (foundUser) {
      if (foundUser) {
        data.token = foundUser.resetPasswordToken;
      } else {
        data.message = 'Your token expired. Please, try again';
      }
      res.view('partials/updatePassword', data);
    });
  },

  update: function (req, res) {
    var pwd = req.param('password'), data = {model: 'users'};
    User.findOne({resetPasswordToken: req.param('token')}).then(function (user) {
      if (!user) {
        data.message = 'User with provided id not found';
        return false;
      }
      if (!pwd || pwd.length < 8) {
        data.id = user.id;
        data.notice = 'Password is required and should contain at least 8 characters';
        return false;
      }
      user.password = sails.crypto.AES.encrypt(pwd, process.env.SALT).toString();
      user.resetPasswordToken = null;
      return user.save();
    }).then(function (savedUser) {
      if (savedUser) {
        data.message = 'Password was reset successfully';
      }
      res.view('partials/updatePassword', data);
    })
  }
};
