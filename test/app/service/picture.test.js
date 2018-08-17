'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');


describe('test/app/service/picture.test.js', () => {

  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { Picture } = ctx.model;
    await Picture.ensureIndexes();
  });

  describe('create(doc)', () => {
    it('创建图片，成功', async () => {
      const ctx = app.mockContext({});
      const { Picture } = ctx.model;
      const data = mock.picture();

      const picture = await ctx.service.picture.create(new Picture(data));

      assert(picture);
      assert(picture.url === data.url);
    });
  });

  describe('update(id, obj)', () => {
    it('更新图片，成功', async () => {
      const ctx = app.mockContext({});
      const picture = await mock.createPicture();

      const picture2 = await ctx.service.picture.update(picture.id, {
        labelIds: [ 'add label' ],
      });

      assert(picture.id === picture2.id);
      assert(picture2.labelIds.length === 1);
    });
  });

  describe('delete(id)', () => {
    it('删除图片，成功', async () => {
      const ctx = app.mockContext({});
      const picture = await mock.createPicture();

      const result = await ctx.service.picture.delete(picture.id);
      assert(result.status === 'deleted');
    });
  });

  describe('find(page = 1, perPage = 10)', () => {
    it('查找图片，成功', async () => {
      await mock.createPictures(2);
      await mock.createPictures(1, { status: 'deleted' });
      await mock.createPictures(2);

      const ctx = app.mockContext({});
      const arr = await ctx.service.picture.find(1, 3);

      assert(arr.length === 3);
      arr.forEach(doc => {
        assert(doc.status !== 'deleted');
      });
    });
  });
});
