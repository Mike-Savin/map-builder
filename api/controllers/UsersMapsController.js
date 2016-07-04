module.exports = {
  index: function (req, res) {
    Map.find({owner: req.currentUser.id}).then(function (maps) {
      res.json(maps);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  },

  show: function (req, res) {
    Map.findOne({id: req.param('id'), owner: req.currentUser.id}).populate('points').then(function (map) {
      if (!map) {
        return res.error({status: 403, key: 'SERVER.ERROR.MAP.NOT_FOUND'});
      }
      res.json(map);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  },

  create: function (req, res) {
    var map,
      owner = req.currentUser.id;
    Map.create({
      name: req.param('name'),
      owner: owner
    }).then(function (createdMap) {
      map = createdMap;

      return User.findOne(owner);
    }).then(function (user) {
      sails.sockets.blast('robots/' + user.robotId + '/start', map.id);
      res.json(map.id);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  },

  update: function (req, res) {
    var map = req.param('id'), 
      owner = req.currentUser.id,
      activeChanged = req.param('active') === false || req.param('active') === 'false',
      error;

    Map.findOne({id: map, owner: owner}).then(function (map) {
      if (!map) {
        error = true;
        return false;
      }

      if (activeChanged) {
        map.active = false;
      } else {
        map.name = req.param('name');
      }

      return map.save();
    }).then(function () {
      if (error) {
        return false;
      }

      if (activeChanged) {
        return User.findOne(owner);
      }
      return false;
    }).then(function (user) {
      if (error) {
        return res.error({status: 403, key: 'SERVER.ERROR.MAP.NOT_FOUND'});
      }

      if (activeChanged) {
        sails.sockets.blast('robots/' + user.robotId + '/stop', map);
      }

      res.json(200);
    });
  }
}