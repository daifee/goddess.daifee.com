'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');

describe('test/app/router/v1.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { User } = ctx.model;
    await User.ensureIndexes();
  });

  describe.only('post /api/v1/users/', () => {
    it('创建用户，成功', async () => {
      const data = {
        name: mock.string(6),
        phone: mock.string(11, '123456789'),
        password: '12345678',
        repeatPassword: '12345678',
      };
      const response = await app.httpRequest()
        .post('/api/v1/users/')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert.deepStrictEqual({
        name: body.data.name,
        phone: body.data.phone,
      }, {
        name: data.name,
        phone: data.phone,
      });
      assert(!body.data.password);
    });

    it('创建用户，密码不一致', async () => {
      const data = {
        name: mock.string(6),
        phone: mock.string(11, '123456789'),
        password: '12345678',
        repeatPassword: '87654321',
      };
      const response = await app.httpRequest()
        .post('/api/v1/users/')
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 100001);
      assert(body.message);
    });

    it('创建用户，数据验证不合法', async () => {
      const data = {
        name: '',
        phone: '竟然是中文',
        password: '12345678',
        repeatPassword: '12345678',
      };
      const response = await app.httpRequest()
        .post('/api/v1/users/')
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 100002);
      assert(body.message);
    });

    it('创建用户，已被占用');
  });
});
