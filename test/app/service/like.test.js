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
    it('创建新收藏');

    it('创建新收藏，已收藏');
  });

  describe('delete(targetId)', () => {
    it('删除收藏');

    it('删除收藏，已删除');

    it('删除收藏，不存在');
  });

  describe('findByTargetId(targetId)', () => {
    it('查找收藏');
  });

  describe('findByTargetIds(targetIds)', () => {
    it('查找多个收藏');
  });

  describe('find(page = 1, perPage = 10)', () => {
    it('查找收藏列表');
  });
});
