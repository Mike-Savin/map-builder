module.exports = {
  send: function (options) {
    var deferred = sails.q.defer();
    options.apiKey = sails.config.mandrillOptions.apiKey;

    console.log(deferred, options);

    sails.mandrill.sendPlaintextEmail(options).exec({
      success: function () {
        deferred.resolve(options.returnItem);
      },
      error: function (error) {
        console.log(error);
        deferred.reject(error);
      }
    });
    return deferred.promise;
  },

  sendTemplate: function (options) {
    var deferred = sails.q.defer();
    options.apiKey = sails.config.mandrillOptions.apiKey;

    sails.mandrill.sendTemplateEmail(options).exec({
      success: function () {
        deferred.resolve();
      },
      error: function (error) {
        console.log(error);
        deferred.reject(error);
      }
    });
    return deferred.promise;
  }
};
