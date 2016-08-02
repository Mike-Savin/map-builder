require('sails-test-helper');

describe(TEST_NAME, function () {
  var tokenTests = [
    {
      method: 'get',
      url: '/users/maps'
    },
    {
      method: 'get',
      url: '/users/maps/foo'
    },
    {
      method: 'post',
      url: '/users/maps'
    },
    {
      method: 'put',
      url: '/users/maps/foo'
    }
  ];

  tokenTests.forEach(function (test) {
    var testName = test.method.toUpperCase() + ' ' + test.url;

    describe(testName, function () {
      it('should be failed and return error without access-token', function (done) {
        request[test.method](test.url).end(function (err, res) {
          res.status.should.equal(403);
          res.body.error.should.contain('SERVER.ERROR.UNAUTHORIZED');
          done();
        });
      });
    });
  });
});
