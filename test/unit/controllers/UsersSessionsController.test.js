require('sails-test-helper');

describe(TEST_NAME, function () {
  factory.load();
  var userParams = factory.build('user');

  describe('POST /users/sessions', function () {
    before(function (done) {
      request.post('/users').send(userParams).end(function (err, res) {
        done();
      });
    });

    describe('with valid parameters', function () {
      it('should be successful and return logged user', function (done) {
        request.post('/users/sessions').send(userParams).end(function (err, res) {
          res.status.should.equal(200);
          res.body.name.should.equal(userParams.name);
          res.body.email.should.equal(userParams.email);
          res.body.robotId.should.equal(userParams.robotId);
          done();
        });
      });
    });

    describe('with invalid parameters', function () {
      it('should be failed and return error with invalid email', function (done) {
        userParams = factory.build('user', {email: 'foo'});

        request.post('/users/sessions').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.EMAIL.INVALID');
          done();
        });
      });

      it('should be failed and return error with invalid password', function (done) {
        userParams = factory.build('user', {password: 'foo'});

        request.post('/users/sessions').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.PASSWORD.INVALID');
          done();
        });
      });
    });
  });
});