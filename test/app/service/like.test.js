'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');


describe('test/app/service/like.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { Like } = ctx.model;
    await Like.ensureIndexes();
  });


  describe('create(doc)', () => {
    it('创建新收藏', async () => {
      const data = mock.like();
      const ctx = app.mockContext({});
      const { Like } = ctx.model;
      let like = new Like(data);
      like = await ctx.service.like.create(like.userId, like);

      assert(like);
      assert(like.userId === data.userId);
      assert(like.status === 'normal');
    });

    it('创建新收藏，targetId一样，userId不一样', async () => {
      const like = await mock.createLike();
      const userId = mock.stringId();
      const ctx = app.mockContext({});
      const { Like } = ctx.model;
      let like2 = new Like({
        targetId: like.targetId,
        userId,
      });
      like2 = await ctx.service.like.create(userId, like2);

      assert(like2);
      assert(like2.targetId === like.targetId);
      assert(like2.userId !== like.userId);
    });

    it('创建新收藏，已收藏', async () => {
      const like = await mock.createLike();
      const ctx = app.mockContext({});
      const { Like } = ctx.model;
      let like2 = new Like({
        targetId: like.targetId,
        userId: like.userId,
      });
      like2 = await ctx.service.like.create(like2.userId, like2);

      assert(like2);
      assert(like2.targetId === like.targetId);
      assert(like2.userId === like.userId);
      assert(like2.id === like.id);
    });
  });

  describe('delete(userId, targetId)', () => {
    it('删除收藏', async () => {
      const like = await mock.createLike();
      const ctx = app.mockContext();

      const result = await ctx.service.like.delete(like.userId, like.targetId);
      assert(result === true);
    });

    it('删除收藏，已删除', async () => {
      const like = await mock.createLike({ status: 'deleted' });
      const ctx = app.mockContext();

      const result = await ctx.service.like.delete(like.userId, like.targetId);
      assert(result === true);
    });

    it('删除收藏，不存在', async () => {
      const like = mock.like();
      const ctx = app.mockContext();

      const result = await ctx.service.like.delete(like.userId, like.targetId);
      assert(result === true);
    });
  });

  describe('findOne(userId, targetId)', () => {
    it('查找收藏', async () => {
      const like = await mock.createLike();
      const ctx = app.mockContext();
      const result = await ctx.service.like.findOne(like.userId, like.targetId);

      assert(result);
      assert(result.id === like.id);
    });
  });

  describe('findMulti(userId, targetIds)', () => {
    it('查找多个收藏', async () => {
      const userId = mock.stringId();
      const likes = await mock.createLikes(3, { userId });
      const ctx = app.mockContext();
      const targetIds = likes.map(like => {
        return like.targetId;
      });

      const arr = await ctx.service.like.findMulti(userId, targetIds);

      assert(arr.length === 3);
    });

    it('查找多个收藏，其中一个不存在', async () => {
      const userId = mock.stringId();
      const likes = await mock.createLikes(3, { userId });
      const ctx = app.mockContext();
      const targetIds = likes.map(like => {
        return like.targetId;
      });

      // 不存在
      targetIds.push(mock.stringId());

      const arr = await ctx.service.like.findMulti(userId, targetIds);

      assert(arr.length === 3);
    });
  });

  describe('find(userId, page = 1, perPage = 10)', () => {
    it('查找收藏列表', async () => {
      const userId = mock.stringId();
      await mock.createLikes(5, { userId });
      await mock.createLike({ userId, status: 'deleted' });
      const ctx = app.mockContext();
      const arr = await ctx.service.like.find(userId, 1, 10);

      assert(arr.length === 5);
    });
  });

  describe('findAll(page = 1, perPage = 10)', () => {
    it('查找收藏列表', async () => {
      const userId = mock.stringId();
      await mock.createLikes(5, { userId });
      await mock.createLikes(5);
      const ctx = app.mockContext();
      const arr = await ctx.service.like.findAll(1, 10);

      assert(arr.length === 10);
    });
  });
});
