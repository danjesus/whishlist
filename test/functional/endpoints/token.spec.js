'use strict';

import {createUser, emptyUsers} from './fixture';

describe('Token route', () => {
  const User = app.db.models.User;

  beforeEach(done => {
    createUser().then(user => {
      done();
    });
  });

  afterEach(done => {
    emptyUsers().then(() => done());
  });

  it('should return a valid token', done => {
    request.post('/token')
      .send({
        email: 'nobody@gmail.com',
        password: '123456'
      })
      .expect(200)
      .end((err, res) => {
        assert(res.body.token);
        done(err);
      });
  });

  it('should return a bad request', done => {
    request.post('/token')
      .expect(400)
      .end((err, res) => {
        done(err);
      });
  });

  it('should return unauthorized request when password not match', done => {
    request.post('/token')
      .send({
        email: 'nobody@gmail.com',
        password: '12345678'
      })
      .expect(401)
      .end((err, res) => {
        done(err);
      });
  });

  it('should return unauthorized request when email not exists', done => {
    request.post('/token')
      .send({
        email: 'fulano@gmail.com',
        password: '12345678'
      })
      .expect(401)
      .end((err, res) => {
        done(err);
      });
  });

});