require('sails-test-helper');

describe(TEST_NAME, function () {
  factory.load();
  var userParams = factory.build('user');

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
      it('should be failed and return error with empty name', function (done) {
        userParams = factory.build('user', {name: null});

        request.post('/users').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.NAME.REQUIRED');
          done();
        });
      });

      it('should be failed and return error with empty email', function (done) {
        userParams = factory.build('user', {email: null});

        request.post('/users').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.EMAIL.REQUIRED');
          done();
        });
      });

      it('should be failed and return error with empty robotId', function (done) {
        userParams = factory.build('user', {robotId: null});

        request.post('/users').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.ROBOT_ID.REQUIRED');
          done();
        });
      });

      it('should be failed and return error with empty password', function (done) {
        userParams = factory.build('user', {password: null});

        request.post('/users').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.PASSWORD.REQUIRED');
          done();
        });
      });

      it('should be failed and return error with invalid email', function (done) {
        userParams = factory.build('user', {email: 'foo'});

        request.post('/users').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.EMAIL.INVALID');
          done();
        });
      });

      it('should be failed and return error with too short password', function (done) {
        userParams = factory.build('user', {password: 'foo'});

        request.post('/users').send(userParams).end(function (err, res) {
          res.status.should.equal(400);
          res.body.error.should.contain('SERVER.ERROR.PASSWORD.TOO_SHORT');
          done();
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