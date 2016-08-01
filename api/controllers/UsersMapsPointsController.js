module.exports = {
  create: function (req, res) {
    var id = req.param('id'), 
      type = req.param('type'),
      error, coordinates;
    Map.findOne({id: id, owner: req.currentUser.id}).then(function (map) {
      if (!map) {
        error = true;
        return false;
      }

      coordinates = Coordinates.get({
        current: {
          x: map.currentX,
          y: map.currentY,
          angle: map.currentAngle,
        },
        distance: req.param('distance'),
        angle: req.param('angle')
      });

      if (type === 0) {
        map.currentX = coordinates.x;
        map.currentY = coordinates.y;
        map.currentAngle = coordinates.angle;
        return map.save();
      }
      return false;
    }).then(function () {
      if (error) {
        return false;
      }
      return Point.create({
        x: coordinates.x,
        y: coordinates.y,
        type: type,
        date: sails.moment(Date.now()).toISOString(),
        map: id
      });
    }).then(function (point) {
      if (error) {
        return res.error({status: 500, key: 'SERVER.ERROR.MAP.NOT_FOUND'});
      }
      sails.sockets.blast('maps/' + id + '/update', point);
      res.json(200);
    }, function (error) {
      console.log(error);
      res.error({status: 500, key: error});
    });
  }
};
