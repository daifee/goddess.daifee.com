'use strict';

const BaseController = require('../core/base-controller');

class MicroBlogController extends BaseController {
  async recommended() {
    const type = this.ctx.query.type || 'animal';

    await this.render('micro-blog-recommended', {
      title: '推荐内容',
      activeMenuKey: type,
    });
  }
}

module.exports = MicroBlogController;
