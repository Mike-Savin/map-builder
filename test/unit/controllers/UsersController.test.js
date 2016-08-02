require('sails-test-helper');

describe(TEST_NAME, function () {
  factory.load();
  var userParams = factory.build('user'),
    userValidations = [
      {
        name: 'empty name',
        invalidData: {name: null},
        error: 'SERVER.ERROR.NAME.REQUIRED'
      },
      {
        name: 'empty email',
        invalidData: {email: null},
        error: 'SERVER.ERROR.EMAIL.REQUIRED'
      },
      {
        name: 'empty robotId',
        invalidData: {robotId: null},
        error: 'SERVER.ERROR.ROBOT_ID.REQUIRED'
      },
      {
        name: 'empty password',
        invalidData: {password: null},
        error: 'SERVER.ERROR.PASSWORD.REQUIRED'
      },
      {
        name: 'invalid email',
        invalidData: {email: 'foo'},
        error: 'SERVER.ERROR.EMAIL.INVALID'
      },
      {
        name: 'too short password',
        invalidData: {password: 'foo'},
        error: 'SERVER.ERROR.PASSWORD.TOO_SHORT'
      }
    ];

  describe('POST /users', function () {
    describe('with valid parameters', function () {
      it('should be successful and return created user', function (done) {
        request.post('/users').send(userParams).end(function (err, res) {
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

          request.post('/users').send(userParams).end(function (err, res) {
            res.status.should.equal(400);
            res.body.error.should.contain(test.error);
            done();
          });
        });
      });

      it('should be failed and return error with already existing provided email', function (done) {
        userParams = factory.build('user');

        request.post('/users').send(userParams).end(function () {
          request.post('/users').send(userParams).end(function (err, res) {
            res.status.should.equal(400);
            res.body.error.should.contain('SERVER.ERROR.EMAIL.EXISTS');
            done();
          });
        });
      });
    });
  });
});
