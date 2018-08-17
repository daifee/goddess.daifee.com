'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');

before(async () => {
  await app.mongoose.connection.dropDatabase();
});


describe('test/app/service/user.test.js', () => {
  describe('create(userJson)', () => {
    it('成功——创建新用户', async () => {
      const ctx = app.mockContext({});
      const { User } = ctx.model;
      const data = mock.user();
      let user = new User(data);
      user = await ctx.service.user.create(user);

      assert.deepStrictEqual({
        phone: user.phone,
        name: user.name,
        status: user.status,
        role: user.role,
      }, {
        phone: data.phone,
        name: data.name,
        status: 'normal',
        role: 'normal',
      });

      assert(user.password !== data.password);
    });

    it('数据验证失败', async () => {
      const ctx = app.mockContext({});
      const { User } = ctx.model;
      try {
        await ctx.service.user.create(new User({
          phone: '13246433455',
        }));

        assert.fail('不应该运行到这里');
      } catch (err) {
        assert(err instanceof Error);
      }
    });

    it('重复创建', async () => {
      const ctx = app.mockContext({});
      const { User } = ctx.model;
      const data = mock.user();

      await ctx.service.user.create(new User(data));

      try {
        await ctx.service.user.create(new User(data));
        assert.fail('不应该运行到这里');
      } catch (err) {
        assert(err.code === 11000);
        assert(err instanceof Error);
      }
    });
  });


  describe('findByPhone', () => {
    it('成功——找到用户', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = mock.user();
      await ctx.service.user.create(new User(data));

      const user = await ctx.service.user.findByPhone(data.phone);

      assert.deepStrictEqual({
        phone: data.phone,
      }, {
        phone: user.phone,
      });
    });

    it('查找不存在的用户', async () => {
      const ctx = app.mockContext();
      const phone = mock.string(11, '289384743');
      const user = await ctx.service.user.findByPhone(phone);

      assert(user === null);
    });

    it('不能找到已删除的用户', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = mock.user({
        status: 'deleted',
      });
      await ctx.service.user.create(new User(data));

      const user = await ctx.service.user.findByPhone(data.phone);

      assert(user === null);
    });
  });


  describe('findById', () => {
    it('成功——找到用户', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = mock.user();
      let user = await ctx.service.user.create(new User(data));

      user = await ctx.service.user.findById(user.id);

      assert.deepStrictEqual({
        phone: data.phone,
      }, {
        phone: user.phone,
      });
    });

    it('不能找到已删除的用户', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = mock.user({
        status: 'deleted',
      });
      let user = await ctx.service.user.create(new User(data));

      user = await ctx.service.user.findById(user.id);

      assert(user === null);
    });
  });
});
