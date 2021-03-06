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
      const data = mock.label();
      await mock.createLabel(data);

      const ctx = app.mockContext({});
      const { Label } = ctx.model;

      try {
        await ctx.service.label.create(new Label(data));
        assert.fail('不应该运行到这里');
      } catch (err) {
        assert(err.status === 400);
        assert(err instanceof Error);
      }
    });
  });

  describe('update(id, model)', () => {
    it('更新标签，成功', async () => {
      const label = await mock.createLabel();

      const ctx = app.mockContext({});

      const data2 = mock.label();
      const label2 = await ctx.service.label.update(label.id, data2);

      assert(label.id === label2.id);
      assert(label.name !== label2.name);
    });

    it('更新标签，重名', async () => {
      const label = await mock.createLabel();

      const ctx = app.mockContext({});
      const { Label } = ctx.model;

      const data2 = mock.label();
      const label2 = await ctx.service.label.create(new Label(data2));

      try {
        await ctx.service.label.update(label.id, { name: label2.name });
        assert.fail('不应该运行到这里');
      } catch (err) {
        assert(err.status === 400);
        assert(err instanceof Error);
      }
    });

    it('更新标签，名字重置为空。update不验证schema数据', async () => {
      const label = await mock.createLabel();

      const ctx = app.mockContext({});

      const newLabel = await ctx.service.label.update(label.id, { name: '' });
      assert(newLabel.name === '');
    });

    it('更新标签，不会更新ID', async () => {
      const label = await mock.createLabel();

      const ctx = app.mockContext({});

      try {
        await ctx.service.label.update(label.id, { _id: 'fuck' });
      } catch (err) {
        assert(err instanceof Error);
      }
    });
  });

  describe('delete(id)', () => {
    it('删除标签，成功', async () => {
      const label = await mock.createLabel();

      const ctx = app.mockContext({});

      const result = await ctx.service.label.delete(label.id);
      assert(result === true);
    });
  });

  describe('find()', () => {
    it('查询所有标签，成功', async () => {
      await mock.createLabels(2);
      await mock.createLabels(1, { status: 'deleted' });

      const ctx = app.mockContext({});

      const arr = await ctx.service.label.find();

      assert(arr.length >= 2);
    });
  });
});
