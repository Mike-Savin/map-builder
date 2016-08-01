require('sails-test-helper');

var userParams, user;

describe(TEST_NAME, function () {

  describe('GET /users/maps', function () {
    before(function (done) {
      factory.load();
      userParams = factory.build('user');

      request.post('/users').send(userParams).end(function (err, res) {
        expect(res.body.accessToken).to.exist;
        user = res.body;
        done();
      });
    });

    describe('without access-token', function () {
      it('should be failed and return error', function (done) {
        
        request.get('/users/maps').end(function (err, res) {
          res.status.should.equal(403);
          res.body.error.should.contain('SERVER.ERROR.UNAUTHORIZED');
          done();
        });
      });
    });

    describe('with access-token', function () {
      it('should be successful and return map list-', function (done) {
        
        request.get('/users/maps').set('access-token', user.accessToken).end(function (err, res) {
          res.status.should.equal(200);
          expect(res.body).to.be.instanceof(Array);
          done();
        });
      });
    });
  });
});