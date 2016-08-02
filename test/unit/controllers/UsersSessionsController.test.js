require('sails-test-helper');

describe(TEST_NAME, function () {
  factory.load();
  var userParams = factory.build('user'),
    userValidations = [
      {
        name: 'invalid email',
        invalidData: {email: 'foo'},
        error: 'SERVER.ERROR.EMAIL.INVALID'
      },
      {
        name: 'invalid password',
        invalidData: {password: 'foo'},
        error: 'SERVER.ERROR.PASSWORD.INVALID'
      }
    ];

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
      userValidations.forEach(function (test) {
        it('should be failed and return error with ' + test.name, function (done) {
          userParams = factory.build('user', test.invalidData);

          request.post('/users/sessions').send(userParams).end(function (err, res) {
            res.status.should.equal(400);
            res.body.error.should.contain(test.error);
            done();
          });
        });
      });
    });
  });
});
