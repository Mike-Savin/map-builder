module.exports = {
  index: function (req, res) {
    Map.find({owner: req.currentUser.id}).then(function (maps) {
      res.json(maps);
    }, function (error) {
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
      res.error({status: 500, key: error});
    });
  },

  create: function (req, res) {
    var map, owner = req.currentUser.id;

    Map.create({name: req.param('name'), owner: owner}).then(function (createdMap) {
      map = createdMap;
      return User.findOne(owner);
    }).then(function (user) {
      sails.sockets.blast('robots/' + user.robotId + '/start', map.id);
      res.json(map.id);
    }, function (error) {
      res.error({status: 500, key: error});
    });
  },

  update: function (req, res) {
    var map = req.param('id'), 
      owner = req.currentUser.id,
      mapDisabled = req.param('active') === 'false',
      error;

    Map.findOne({id: map, owner: owner}).then(function (map) {
      if (!map) {
        error = true;
        return false;
      }
      return Map.update({id: map}, req.body);
    }).then(function () {
      if (error || !mapDisabled) {
        return false;
      }
      return User.findOne(owner);
    }).then(function (user) {
      if (error) {
        return res.error({status: 403, key: 'SERVER.ERROR.MAP.NOT_FOUND'});
      }
      if (mapDisabled) {
        sails.sockets.blast('robots/' + user.robotId + '/stop', map);
      }
      res.json(200);
    });
  }
};
