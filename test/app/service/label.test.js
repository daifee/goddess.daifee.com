'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');


describe('test/app/service/label.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { Label } = ctx.model;
    await Label.ensureIndexes();
  });


  describe('create(model)', () => {
    it('创建新标签，成功', async () => {
      const ctx = app.mockContext({});
      const { Label } = ctx.model;
      const data = mock.label();
      let label = new Label(data);
      label = await ctx.service.label.create(label);

      assert.deepStrictEqual({
        name: label.name,
        description: label.description,
      }, {
        name: data.name,
        description: data.description,
      });
    });

    it('创建新标签，缺少名字', async () => {
      const ctx = app.mockContext({});
      const { Label } = ctx.model;
      const label = new Label({});

      try {
        await ctx.service.label.create(label);
        assert.fail('不应该运行到这里');
      } catch (err) {
        assert(err instanceof Error);
      }
    });

    it('创建新标签，重名', async () => {
      const ctx = app.mockContext({});
      const { Label } = ctx.model;
      const data = mock.label({ age: 'normal' });
      await ctx.service.label.create(new Label(data));

      try {
        await ctx.service.label.create(new Label(data));
        assert.fail('不应该运行到这里');
      } catch (err) {
        assert(err.code === 11000);
        assert(err instanceof Error);
      }
    });
  });

  describe('update(id, model)', () => {
    it('更新标签，成功');

    it('更新标签，重名');

    it('更新标签，名字重置为空');

    it('更新标签，不会更新ID');
  });

  describe('delete(id)', () => {
    it('删除标签，成功');
  });

  describe('find()', () => {
    it('查询所有标签，成功');
  });
});
