module.exports = {
  get: function (params) {
    var result = {};

    result.angle = params.current.angle + 90 - params.angle;

    result.x = params.current.x + params.distance * Math.cos(result.angle / 180 * Math.PI);
    result.y = params.current.y + params.distance * Math.sin(result.angle / 180 * Math.PI);

    return result;
  }
};
