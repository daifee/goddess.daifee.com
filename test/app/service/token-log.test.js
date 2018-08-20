'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const mock = require('../../mock');

describe('test/app/service/token-log.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();

    const ctx = app.mockContext({});
    const { TokenLog } = ctx.model;
    await TokenLog.ensureIndexes();
  });

  it('记录token', async () => {
    const ctx = app.mockContext();
    const { TokenLog } = ctx.model;
    const doc = new TokenLog({
      userId: mock.stringId(),
      token: mock.stringId(),
    });
    await ctx.service.tokenLog.create(doc);

    assert.ok('成功记录');
  });
});
