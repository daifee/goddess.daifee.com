'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');

describe('test/app/router/router.test.js', () => {
  it('/login', async () => {
    const response = await app.httpRequest()
      .get('/login')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200);

    const body = response.text;
    assert(body);
    assert(body.length >= 20);
  });

  it('/register', async () => {
    const response = await app.httpRequest()
      .get('/register')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200);

    const body = response.text;
    assert(body);
    assert(body.length >= 20);
  });

  it('/logout', async () => {
    const response = await app.httpRequest()
      .get('/logout')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect('Location', '/')
      .expect(302);

    const body = response.text;
    assert(body);
    assert(body.length >= 20);
  });

  it('/', async () => {
    const response = await app.httpRequest()
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect('Location', '/recommended/')
      .expect(302);

    const body = response.text;
    assert(body);
    assert(body.length >= 20);
  });

  describe('/users/:id', () => {
    it('授权访问', async () => {
      const admin = await mock.createUser({ role: 'admin' });
      const token = admin.jwtSign();

      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.text;
      assert(body);
      assert(body.length >= 20);
    });

    it('未授权访问', async () => {
      const response = await app.httpRequest()
        .get('/users/userid')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect('Location', '/login')
        .expect(302);

      const body = response.text;
      assert(body);
      assert(body.length >= 20);
    });
  });


  describe('cros', () => {
    it('optiont请求', async () => {
      const response = await app.httpRequest()
        .options('/api/options')
        .set('Accept', 'text')
        .set('Access-Control-Request-Headers', 'Authorization')
        .expect('Content-Type', /text/)
        .expect('Access-Control-Allow-Origin', '*')
        .expect('Access-Control-Allow-Methods', 'DELETE, GET, PUT, POST, OPTIONTS')
        .expect('Access-Control-Allow-Headers', 'Authorization')
        .expect('Access-Control-Max-Age', '86400')
        .expect(200);

      const body = response.text;
      assert(body === 'allow cros');
    });

    it('delete请求', async () => {
      await app.httpRequest()
        .delete('/api/options')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Access-Control-Allow-Origin', '*');
    });
  });
});
