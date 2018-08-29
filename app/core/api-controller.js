'use strict';

const BaseController = require('./base-controller');

class ApiController extends BaseController {

  /**
   * 当前用户
   * 依赖 `./middleware/authorize.js` 实现
   * @readonly
   * @memberof ApiController
   */
  get user() {
    return this.ctx.user;
  }

  /**
   * API输出数据
   *
   * @param {any} [data=null] 数据 response.body.data
   * @memberof ApiController
   */
  echo(data = null) {
    this.ctx.body = {
      code: 0,
      message: 'success',
      data,
    };
  }

  assert(value, status, msg, opts) {
    this.ctx.assert(value, status, msg, opts);
  }

  /**
   * 断言 userId === this.user.id
   * 如果 false 抛出异常
   * @param {string} userId 用户ID
   * @memberof ApiController
   */
  assertUser(userId) {
    this.ctx.assert(this.user && this.user.id === userId, 403);
  }
}

module.exports = ApiController;
