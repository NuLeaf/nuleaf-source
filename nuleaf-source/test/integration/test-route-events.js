var supertest = require('supertest');
var app       = require('../../server');


exports.search_should_always_succeed = function(done) {
  supertest(app)
  .get('/events')
  .expect(200)
  .end(done);
};

exports.search_should_accept_start_date = function(done) {
  supertest(app)
  .get('/events')
  .query({ start_date: '01/01/01' })
  .expect(200)
  .end(done);
};

exports.search_should_accept_end_date = function(done) {
  supertest(app)
  .get('/events')
  .query({ end_date: '01/01/01' })
  .expect(200)
  .end(done);
};

exports.search_should_reject_bad_start_date = function(done) {
  supertest(app)
  .get('/events')
  .query({ start_date: '13/13/13' })
  .expect(400)
  .end(done);
};

exports.search_should_reject_bad_end_date = function(done) {
  supertest(app)
  .get('/events')
  .query({ end_date: '13/13/13' })
  .expect(400)
  .end(done);
};

exports.search_should_reject_non_string_locations = function(done) {
  supertest(app)
  .get('/events')
  .query({ location: 1 })
  .expect(400)
  .end(done);
};



exports.store_should_require_only_title = function(done) {
  supertest(app)
  .post('/events')
  .send({ title: 'event' })
  .expect(201)
  .end(done);
};