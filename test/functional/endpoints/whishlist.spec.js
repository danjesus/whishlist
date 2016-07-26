'use strict';

import {createWhishlist} from './fixture';
import jwt from 'jsonwebtoken';

describe('Whishlist route', () => {

  let token;
  let fakeWhishes;

  beforeEach(done => {
    createWhishlist((whishes, user) => {
      token = jwt.sign({ id: user.id }, app.get('jwtSecret'));
      fakeWhishes = whishes;
      done();
    });
  });

  it('should list whishlist to a user', done => {
    request.get('/whishlist')
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .end((err, res) => {

        const TOTAL = res.body.length;

        for (let index = 0; index < TOTAL; index++) {
          assert.equal(fakeWhishes[index].average_value, res.body[index].average_value);
          assert.equal(fakeWhishes[index].description, res.body[index].description);
          assert.equal(fakeWhishes[index].name, res.body[index].name);
        }

        done(err);
      });
  });

  it('should create a new whish list item', done => {
    request.post('/whishlist')
      .set('Authorization', `JWT ${token}`)
      .send({
        name: "New Mac Book retina",
        average_value: 1000,
        description: "Novo Macbook test"
      })
      .expect(201)
      .end((err, res) => {
        done(err);
      })
  });
});