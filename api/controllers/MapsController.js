module.exports = {
  index: function (req, res) {
    Map.find().then(function (maps) {
      res.json(maps);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  },

  show: function (req, res) {
    Map.findOne(req.param('id')).populate('points').then(function (map) {
      if (!map) {
        return res.error({status: 403, key: 'SERVER.ERROR.NOT_FOUND'});
      }
      res.json(map);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  },

  create: function (req, res) {
    Map.create({
      name: req.param('name'),
      owner: req.param('owner')
    }).then(function (map) {
      res.json(map);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  }
}