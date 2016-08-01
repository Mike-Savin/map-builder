module.exports = function error(error) {

  var req = this.req,
    res = this.res,
    sails = req._sails,
    status = error.status,
    result = {error: error.key ? [error.key] : ['SERVER.ERROR.INTERNAL']};

  sails.log('res.validationError() :: Server Error');
  sails.log(error);

  if (error.key.toJSON && error.key.toJSON().Errors) {
    error = error.key.toJSON();
    status = 400;
    result.error = [];
    Object.keys(error.Errors).forEach(function (attribute) {
      Object.keys(error.Errors[attribute]).forEach(function (index) {
        if (error.Errors[attribute][index].rule !== 'string') {
          result.error.push(error.Errors[attribute][index].message);
        }
      });
    });
  } else if (error.originalError && error.originalError.status === 400) {
    status = 400;
    result = error.originalError.message;
  }

  return res.json(status, result);
};