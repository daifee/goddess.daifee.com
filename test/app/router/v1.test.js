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

  describe('post /api/v1/users/', () => {
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
      assert(body.data.token);
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
      assert(body.code === 400);
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
      assert(body.code === 400);
      assert(body.message);
    });

    it('创建用户，已被占用', async () => {
      const user = await mock.createUser();
      const response = await app.httpRequest()
        .post('/api/v1/users/')
        .set('Accept', 'application/json')
        .send({
          name: user.name,
          phone: user.phone,
          password: '12345678',
          repeatPassword: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 400);
      assert(body.message);
    });
  });

  describe('post /api/v1/users/authorization', () => {
    it('授权，成功', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = {
        name: mock.string(6),
        phone: mock.string(11, '123456789'),
        password: '12345678',
      };

      await mock.createUser(data);

      const response = await app.httpRequest()
        .post('/api/v1/authorization')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      const token = body.data.token;
      assert(body.code === 0);
      assert(body.data.phone === data.phone);
      assert(typeof token === 'string');
      // 很长的字符串
      assert(token.length > 20);
      // 验证token
      const jwtVerify = (new User({})).jwtVerify;
      const payload = jwtVerify(token);
      assert(payload);
    });
  });

  describe('get /api/v1/cos/sts', () => {
    it('获取临时key，成功', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .get('/api/v1/cos/sts')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data.credentials.tmpSecretId);
      assert(body.data.credentials.tmpSecretKey);
      assert(body.data.credentials.sessionToken);
      assert(body.data.expiredTime);
    });
  });

  describe('get /api/v1/users/:userId/micro-blogs/', () => {
    it('获取用户微博列表', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      await mock.createMicroBlogs(4, { userId: user.id });

      const response = await app.httpRequest()
        .get(`/api/v1/users/${user.id}/micro-blogs/`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(Array.isArray(body.data));
      assert(body.data.length >= 4);
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .get('/api/v1/users/other/micro-blogs/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('post /api/v1/users/:userId/micro-blogs/', () => {
    it('发布微博', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const data = mock.microBlog();

      const response = await app.httpRequest()
        .post(`/api/v1/users/${user.id}/micro-blogs/`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data.userId === user.id);
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .post('/api/v1/users/other/micro-blogs/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('put /api/v1/users/:userId/micro-blogs/:blogId', () => {
    it('修改微博', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const blog = await mock.createMicroBlog();

      const response = await app.httpRequest()
        .put(`/api/v1/users/${user.id}/micro-blogs/${blog.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'hello' })
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data.id === blog.id);
      assert(body.data.text === 'hello');
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .put('/api/v1/users/other/micro-blogs/id')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('delete /api/v1/users/:userId/micro-blogs/:blogId', () => {
    it('删除微博', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const blog = await mock.createMicroBlog();

      const response = await app.httpRequest()
        .delete(`/api/v1/users/${user.id}/micro-blogs/${blog.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data === true);
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .delete('/api/v1/users/other/micro-blogs/id')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('get /api/v1/users/:userId/likes/', () => {
    it('获取用户收藏列表', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      await mock.createLikes(4, { userId: user.id });

      const response = await app.httpRequest()
        .get(`/api/v1/users/${user.id}/likes/`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(Array.isArray(body.data));
      assert(body.data.length >= 4);
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .get('/api/v1/users/other/likes/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('post /api/v1/users/:userId/likes/', () => {
    it('用户添加收藏', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const data = mock.like();

      const response = await app.httpRequest()
        .post(`/api/v1/users/${user.id}/likes/`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data.targetId === data.targetId);
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .post('/api/v1/users/other/likes/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('delete /api/v1/users/:userId/likes/:likeId', () => {
    it('用户删除收藏', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const like = await mock.createLike({ userId: user.id });

      const response = await app.httpRequest()
        .delete(`/api/v1/users/${user.id}/likes/${like.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(body.data === true);
    });

    it('没权限操作他人内容', async () => {
      const user = await mock.createUser();
      const token = user.jwtSign();
      const response = await app.httpRequest()
        .delete('/api/v1/users/other/likes/id')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 403);
    });
  });

  describe('get /api/v1/users/:userId/micro-blogs/', () => {
    it('获取微博列表，默认', async () => {
      const user = await mock.createUser();
      await mock.createMicroBlogs(4, {
        userId: user.id,
        recommended: 'goddess',
      });

      const response = await app.httpRequest()
        .get('/api/v1/micro-blogs/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(Array.isArray(body.data));
      assert(body.data.length === 2);
      assert(body.data[0].recommended === 'goddess');
    });

    it('获取微博列表，animal', async () => {
      const user = await mock.createUser();
      await mock.createMicroBlogs(4, {
        userId: user.id,
        recommended: 'animal',
      });

      const response = await app.httpRequest()
        .get('/api/v1/micro-blogs/?type=animal')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(Array.isArray(body.data));
      assert(body.data.length === 2);
      assert(body.data[0].recommended === 'animal');
    });
  });

  describe('get /api/v1/pictures/multiple/', () => {
    it('获取多张图片', async () => {
      const pictures = await mock.createPictures(4);
      let urls = pictures.map(item => {
        return item.url;
      });
      urls = urls.join(',');
      urls = encodeURIComponent(urls);

      const response = await app.httpRequest()
        .get(`/api/v1/pictures/multiple/?urls=${urls}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const body = response.body;
      assert(body.code === 0);
      assert(Array.isArray(body.data));
      assert(body.data.length === 4);
    });
  });
});
