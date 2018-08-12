'use strict';

// 每处调用 this.ctx.throw(code) 都必须有唯一的 code
// code 不能小于 10000
module.exports = {
  10000: '抛出错误，未指定code',
  10001: '参数错误',
};
