'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');


describe('test/app/service/micro-blog.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { MicroBlog } = ctx.model;
    await MicroBlog.ensureIndexes();
  });

  describe('create(doc)', () => {
    it('创建新微博，成功', async () => {
      const data = mock.microBlog();

      const ctx = app.mockContext({});
      const { MicroBlog } = ctx.model;
      const doc = new MicroBlog(data);
      const newDoc = await ctx.service.microBlog.create(doc);

      assert(newDoc);
      assert(newDoc.id === doc.id);
      assert(newDoc === doc);
    });

    it('创建新微博，而且图片会创建Picture文档', async () => {
      const data = mock.microBlog();

      const ctx = app.mockContext({});
      const { MicroBlog, Picture } = ctx.model;
      const doc = new MicroBlog(data);
      const newDoc = await ctx.service.microBlog.create(doc);

      const pictures = await Picture.find({ userId: newDoc.userId }).exec();
      assert(newDoc.pictureUrls.length === pictures.length);
    });
  });

  describe('update(id, obj)', () => {
    it('更新微博，成功', async () => {
      const microBlog = await mock.createMicroBlog();
      const ctx = app.mockContext({});

      const newDoc = await ctx.service.microBlog.update(microBlog.id, {
        text: 'haha',
      });

      assert(microBlog.id === newDoc.id);
      assert(microBlog.text !== newDoc.text);
    });
  });

  describe('delete(id)', () => {
    it('删除微博，成功', async () => {
      const microBlog = await mock.createMicroBlog();
      const ctx = app.mockContext({});

      const result = await ctx.service.microBlog.delete(microBlog.id);

      assert(result === true);
    });
  });

  describe('findById(id)', () => {
    it('查找微博，成功', async () => {
      const microBlog = await mock.createMicroBlog();
      const ctx = app.mockContext({});

      const doc = await ctx.service.microBlog.findById(microBlog.id);

      assert(doc);
    });

    it('查找微博，删除的', async () => {
      const microBlog = await mock.createMicroBlog({ status: 'deleted' });
      const ctx = app.mockContext({});

      const doc = await ctx.service.microBlog.findById(microBlog.id);

      assert(doc === null);
    });
  });

  describe('find(page = 1, perPage = 10)', () => {
    it('查找微博（全部，分页）', async () => {
      await mock.createMicroBlogs(5);
      const ctx = app.mockContext({});

      const docs = await ctx.service.microBlog.find(1, 3);

      assert(docs.length === 3);
    });
  });

  describe('findByUserId(userId, page = 1, perPage = 10)', () => {
    it('查找微博（用户，分页）', async () => {
      const userId = mock.stringId();
      await mock.createMicroBlogs(5, { userId });
      const ctx = app.mockContext({});
      const docs = await ctx.service.microBlog.findByUserId(userId, 1, 30);

      assert(docs.length === 5);
    });
  });

  describe('findDeleted(page = 1, perPage = 10)', () => {
    it('查找微博（全部已删除，分页）', async () => {
      await mock.createMicroBlogs(5, { status: 'deleted' });
      const ctx = app.mockContext({});

      const docs = await ctx.service.microBlog.findDeleted(1, 3);

      assert(docs.length === 3);
    });
  });

  describe('findDeletedByUserId(userId, page = 1, perPage = 10)', () => {
    it('查找微博（用户已删除，分页）', async () => {
      const userId = mock.stringId();
      await mock.createMicroBlogs(5, { userId, status: 'deleted' });
      const ctx = app.mockContext({});
      const docs = await ctx.service.microBlog.findDeletedByUserId(userId, 1, 30);

      assert(docs.length === 5);
    });
  });

  describe('findRecommended(type = "goddess")', () => {
    it('查找微博（根据推荐专题，只返回2条，根据推荐时间排序）', async () => {
      await mock.createMicroBlog({ recommended: 'goddess' });
      await mock.createMicroBlog({ recommended: 'goddess' });
      await mock.createMicroBlog({ recommended: 'goddess' });
      await mock.createMicroBlog({ recommended: 'goddess' });
      await mock.createMicroBlog({ recommended: 'goddess' });

      const ctx = app.mockContext({});
      const docs = await ctx.service.microBlog.findRecommended('goddess');

      assert(docs.length === 2);
      assert(docs[0].recommendedTime > docs[1].recommendedTime);
    });

    it('查找微博（根据推荐专题，只返回2条，根据推荐时间排序），landscape', async () => {
      await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });

      const ctx = app.mockContext({});
      const docs = await ctx.service.microBlog.findRecommended('landscape');

      assert(docs.length === 2);
      assert(docs[0].recommendedTime > docs[1].recommendedTime);
    });
  });

  describe('recommend(id)', () => {
    it('推荐', async () => {
      const microBlog = await mock.createMicroBlog();
      const ctx = app.mockContext({});
      const newMicroBlog = await ctx.service.microBlog.recommend(microBlog.id, 'landscape');

      assert(microBlog.id === newMicroBlog.id);
      assert(newMicroBlog.recommended === 'landscape');
      assert(newMicroBlog.recommendedTime !== microBlog.recommendedTime);
    });
  });

  describe('freshRecommendedTime(id)', () => {
    it('刷新推荐时间', async () => {
      const microBlog = await mock.createMicroBlog();
      const ctx = app.mockContext({});
      const newMicroBlog = await ctx.service.microBlog.freshRecommendedTime(microBlog.id);

      assert(microBlog.id === newMicroBlog.id);
      assert(newMicroBlog.recommendedTime !== microBlog.recommendedTime);
    });
  });

  describe('freshRecommendedTime(id) & findRecommended(recommended)', () => {
    it('刷新后生效', async () => {
      await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });
      const target = await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });
      await mock.createMicroBlog({ recommended: 'landscape' });

      const ctx = app.mockContext({});
      await ctx.service.microBlog.freshRecommendedTime(target.id);
      const docs = await ctx.service.microBlog.findRecommended('landscape');

      assert(docs[0].id === target.id);
    });
  });
});
