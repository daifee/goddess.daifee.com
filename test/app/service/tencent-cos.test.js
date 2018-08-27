'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/tencent-cos.test.js', () => {

  it('getTempKeys()', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.tencentCos.getTempKeys();

    assert(result);
    assert(result.credentials);
    assert(result.expiredTime > Date.now() / 1000);
  });

});
