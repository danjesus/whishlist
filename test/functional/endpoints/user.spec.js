'use strict';

import {createUser, emptyUsers} from './fixture';
import jwt from 'jsonwebtoken';

describe('User route', () => {

  let token;

  before(done => {
    app.db.sequelize.sync().then(() => {
      done()
    });
  });

  beforeEach(done => {
    createUser().then(user => {
      token = jwt.sign({ id: user.id }, app.get('jwtSecret'));
      done();
    });
  });

  afterEach(done => {
    emptyUsers().then(() => done());
  });

  it('should return user logged', done => {
    request.get('/user')
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .end((err, res) => done(err));
  });

  it('should update user data', done => {
    request.put('/user')
      .send({
        name: 'Steve woz',
        email: 'steve@apple.com',
        password: 'newpass',
        zipcode: '04195020'
      })
      .set('Authorization', `JWT ${token}`)
      .expect(204)
      .end((err, res) => done(err));
  });
})