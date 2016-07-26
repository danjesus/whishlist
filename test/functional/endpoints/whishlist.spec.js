'use strict';

import {createWhishlist, emptyWhishlists, emptyUsers} from './fixture';
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

  afterEach(done=> {
    emptyUsers().then(() => {
      emptyWhishlists().then(() => done())
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
        assert.equal("New Mac Book retina", res.body.name);
        assert.equal(1000, res.body.average_value);
        assert.equal("Novo Macbook test", res.body.description);
        done(err);
      })
  });

  it('should retrieve a whish list item', done => {
    request.get(`/whishlist/${fakeWhishes[0].id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .end((err, res) => {
        assert.equal(fakeWhishes[0].average_value, res.body.average_value);
        assert.equal(fakeWhishes[0].description, res.body.description);
        assert.equal(fakeWhishes[0].name, res.body.name);
        done(err);
      });
  });

  it('should update a whish list item', done => {
    request.put(`/whishlist/${fakeWhishes[0].id}`)
      .set('Authorization', `JWT ${token}`)
      .send({
        name: 'Ipad',
        description: 'Ipad new',
        average_value: 2009.00
      })
      .expect(204)
      .end((err, res) => done(err));
  });

  it('should delete a whish list item', done => {
    request.delete(`/whishlist/${fakeWhishes[0].id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(204)
      .end((err, res) => done(err));
  });

});