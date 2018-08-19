'use strict';

// 每处调用 this.ctx.throw(code) 都必须有唯一的 code
// code 不能小于 10000
module.exports = {
  10000: '抛出错误，未指定code',

  /**
   * 10001 ~ 19999
   * controller层数据验证出错
   */
  100001: '密码不一致',
  100002: '数据格式不正确',

  /**
   * 20000 ~ 29999
   * service层出错
   */
};
