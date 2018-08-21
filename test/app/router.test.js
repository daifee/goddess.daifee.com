'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/router.test.js', () => {
  describe('/404', () => {
    it('json', async () => {
      const response = await app.httpRequest()
        .get('/404')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      assert.deepStrictEqual(response.body, {
        code: 404,
        message: 'Not Found',
      });
    });

    it('html', async () => {
      const response = await app.httpRequest()
        .get('/404')
        .expect('Content-Type', /html/)
        .expect(404);

      assert(response.body);
    });
  });
});
