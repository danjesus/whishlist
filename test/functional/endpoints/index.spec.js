'use strict';

describe('Index route', () => {
    it('should return api status 200', done => {
      request.get('/')
        .expect(200)
        .end((err, res) => {
          const expectedResult = { status: 'Whishlist API ready'};

          assert.deepEqual(res.body, expectedResult);
          done(err);
        });
    });

});
