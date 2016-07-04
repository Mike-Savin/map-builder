module.exports = {
  create: function (req, res) {
    User.create({
      name: req.param('name'),
      email: req.param('email'),
      robotId: req.param('robotId'),
      password: req.param('password')
    }).then(function (user) {
      if (user) {
        user.maps = [];
        return res.json(user);
      }
      res.error({status: 500, key: 'SERVER.ERROR.SERVER'});
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  }
};
