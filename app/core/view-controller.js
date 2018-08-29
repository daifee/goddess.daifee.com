'use strict';

const BaseController = require('./base-controller');

class ViewController extends BaseController {

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
