module.exports = {
  index: function (req, res) {
    Map.find().then(function (maps) {
      res.view('maps/index', {maps: maps});
    }, function (error) {
      console.log(error);
      res.serverError(error);
    })
  },

  show: function (req, res) {
    Map.findOne(req.param('id')).populate('points').then(function (map) {
      if (!map) {
        return res.notFound();
      }

      res.view('maps/show', {map: map});
    }, function (error) {
      console.log(error);
      res.serverError(error);
    })
  }
}