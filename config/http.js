module.exports.http = {
  middleware: {
    requestLogger: function (req, res, next) {
      console.log('Requested :: ', req.method, req.url);
      console.log('Content ::');
      ['params', 'query', 'body'].forEach(function (content) {
        if (req[content]) {
          console.log(content + ': ');
          console.log(req[content]);
        }
      });
      return next();
    },
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'bodyParser',
      'requestLogger',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
  }
};
