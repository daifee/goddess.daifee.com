'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');

describe('test/app/router/admin.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { User } = ctx.model;
    await User.ensureIndexes();
  });

  describe('get /api/admin/labels/', () => {
    it('获取所有标签', async () => {
      await mock.createLabels(4);
      const admin = await mock.createUser({ role: 'admin' });
      const token = admin.jwtSign();

      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(Array.isArray(body.data));
      assert(body.data.length >= 4);
    });

    it('14001', async () => {
      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      assert(response.body.code === 14001);
    });

    it('14002', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      assert(response.body.code === 14002);
    });

    it('14003', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', `type ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      assert(response.body.code === 14003);
    });

    it('14004 token已过期');

    it('14005', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      assert(response.body.code === 14005);
    });

    it('14006', async () => {
      const token = 'fuck';
      const response = await app.httpRequest()
        .get('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      assert(response.body.code === 14006);
    });
  });
});
