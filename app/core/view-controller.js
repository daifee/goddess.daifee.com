'use strict';

const BaseController = require('./base-controller');
const USER = Symbol('USER');

class ViewController extends BaseController {
  /**
   * 当前用户
   * 依赖cookie
   * @readonly
   * @memberof ViewController
   */
  get user() {
    if (typeof this[USER] !== undefined) {
      return this[USER];
    }

    const { User } = this.model;
    const token = this.cookies.get('Authorization', { signed: false });
    try {
      const tokenObj = User.jwtVerify(token);
      this[USER] = tokenObj.user;
    } catch (error) {
      this[USER] = null;
    }

    return this[USER];
  }

  login(token) {
    this.cookies.set('Authorization', token, { signed: false });
  }

  logout() {
    this.cookies.set('Authorization', '', { signed: false, maxAge: -1 });
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
}

module.exports = ViewController;
