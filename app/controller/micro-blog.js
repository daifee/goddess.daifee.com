'use strict';

const BaseController = require('../core/base-controller');

class MicroBlogController extends BaseController {
  async recommended() {
    await this.render('micro-blog-recommended', {
      title: '推荐内容',
    });
  }
}

module.exports = MicroBlogController;
