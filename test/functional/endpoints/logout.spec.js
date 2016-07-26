'use strict';

import {createUser, emptyUsers} from './fixture';
import jwt from 'jsonwebtoken';

describe('Logout route', () => {

  let token;
  
  beforeEach(done => {
    createUser().then(user => {
      token = jwt.sign({ id: user.id }, app.get('jwtSecret'));
      done();
    });
  });

  afterEach(done => {
    emptyUsers().then(() => done());
  });

  it("should logout user", done => {
    request.get('/logout')
      .set('Authorization', `JWT ${token}`)
      .expect(401)
      .end((err, res) => {
        done(err);
      });
  })
});