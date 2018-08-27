'use strict';

const { Controller } = require('egg');


class BaseController extends Controller {

  /**
   * 当前用户
   * 依赖 `./middleware/authorize.js` 实现
   * @readonly
   * @memberof BaseController
   */
  get user() {
    return this.ctx.user;
  }

  /**
   * API输出数据
   *
   * @param {any} [data=null] 数据 response.body.data
   * @memberof BaseController
   */
  echo(data = null) {
    this.ctx.body = {
      code: 0,
      message: 'success',
      data,
    };
  }

  /**
     * Render a file by view engine
     * @param {String} name - the file path based on root
     * @param {Object} [locals] - data used by template
     * @property {String} [locals.pageName] 页面名称，默认与 name 相同
     * @param {Object} [options] - view options, you can use `options.viewEngine` to specify view engine
     * @return {Promise<String>} result - return a promise with a render result
     */
  async render(name, locals = {}, options = {}) {
    if (!locals.pageName) {
      locals.pageName = name;
    }

    locals.user = this.ctx.getCookieUser();

    if (this.ctx.app.config.env === 'local') {
      await this.updateAssetsMap();
    }
    return await this.ctx.render(name, locals, options);
  }

  async updateAssetsMap() {
    const app = this.ctx.app;
    const config = app.config.assets;
    const url = config.publicPath + '/' + config.assetsMapFileName;

    const response = await this.ctx.curl(url, { dataType: 'json' });

    Object.assign(app.locals, {
      assetsMap: response.data,
    });
  }

  /**
   * 断言，如果 value 为 false，则抛出错误
   *
   * @param {boolean} value 值
   * @param {*} code errorCodes
   * @param {string} [message=''] 错误信息
   * @param {*} [properties={}] error对象扩展属性
   * @memberof BaseController
   */
  assert(value, code, message = '', properties = {}) {
    if (!value) {
      this.ctx.throw(code, message, properties);
    }
  }

  /**
   * 断言 userId === this.user.id
   * 如果 false 抛出异常
   * @param {string} userId 用户ID
   * @memberof BaseController
   */
  assertUser(userId) {
    this.assert(this.user && this.user.id === userId, 14015);
  }
}

module.exports = BaseController;
