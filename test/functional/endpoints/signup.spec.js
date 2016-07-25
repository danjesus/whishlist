'use strict';

describe('Signup route', () => {

  it("should create a user", done => {
    request.post('/signup')
      .send({
        email: 'jhondue@gmail.com',
        password: 'lalalala',
        zipcode: '04429280'
      })
        .expect(201)
        .end((err, res) => {
          let expectedResult = {message: "User created"};
          assert.deepEqual(res.body, expectedResult);
          done(err);
        });
  });

});
