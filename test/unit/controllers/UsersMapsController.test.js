require('sails-test-helper');

var mapParams, user, mapId,
  mapValidations = [
    {
      name: 'empty name',
      invalidData: {name: null},
      error: 'SERVER.ERROR.NAME.REQUIRED'
    }
  ];

describe(TEST_NAME, function () {
  before(function (done) {
    factory.load();
    var userParams = factory.build('user');

    request.post('/users').send(userParams).end(function (err, res) {
      expect(res.body.id).to.exist;
      expect(res.body.accessToken).to.exist;

      user = res.body;
      mapParams = factory.build('map', {owner: user.id});

      request.post('/users/maps').set('access-token', user.accessToken).send(mapParams).end(function (err, res) {
        mapId = res.body;
        done();
      });
    });
  });

  describe('GET /users/maps', function () {
    it('should be successful and return map list', function (done) {
      request.get('/users/maps').set('access-token', user.accessToken).end(function (err, res) {
        res.status.should.equal(200);
        expect(res.body).to.be.instanceof(Array);
        done();
      });
    });
  });

  describe('GET /users/maps/:id', function () {
    it('should be successful and return requested map', function (done) {
      request.get('/users/maps/' + mapId).set('access-token', user.accessToken).end(function (err, res) {
        res.status.should.equal(200);
        res.body.name.should.equal(mapParams.name);
        res.body.owner.should.equal(mapParams.owner);
        done();
      });
    });
  });

  describe('POST /users/maps', function () {
    describe('with valid parameters', function () {
      it('should be successful and return created map id', function (done) {
        request.post('/users/maps').set('access-token', user.accessToken).send(mapParams).end(function (err, res) {
          res.status.should.equal(200);
          expect(typeof res.body).to.equal(typeof user.id);
          done();
        });
      });
    });


    describe('with invalid parameters', function () {
      mapValidations.forEach(function (test) {
        it('should be failed and return error with ' + test.name, function (done) {
          mapParams = factory.build('map', test.invalidData);
          mapParams.owner = user.id;

          request.post('/users/maps').set('access-token', user.accessToken).send(mapParams).end(function (err, res) {
            res.status.should.equal(400);
            res.body.error.should.contain(test.error);
            done();
          });
        });
      });
    });
  });
});
