'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');

describe.only('test/app/router/admin.test.js', () => {
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


  describe('post /api/admin/labels/', () => {
    it('创建标签', async () => {
      const admin = await mock.createUser({ role: 'admin' });
      const token = admin.jwtSign();
      const data = {
        name: mock.string(5),
        description: mock.string(14),
      };
      const response = await app.httpRequest()
        .post('/api/admin/labels/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert.deepStrictEqual(data, {
        name: body.data.name,
        description: body.data.description,
      });
    });
  });

  describe('put /api/admin/labels/:id', () => {
    it('更新标签', async () => {
      const label = await mock.createLabel();
      const admin = await mock.createUser({ role: 'admin' });
      const token = admin.jwtSign();
      const data = {
        name: mock.string(5),
      };
      const response = await app.httpRequest()
        .put(`/api/admin/labels/${label.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data.id === label.id);
      assert(body.data.name === data.name);
    });
  });

  describe('delete /api/admin/labels/:id', () => {
    it('删除标签');
  });

  describe('get /api/admin/pictures/', () => {
    it('获取图片列表');
  });

  describe('put /api/admin/pictures/:id', () => {
    it('更新图片');
  });


});
