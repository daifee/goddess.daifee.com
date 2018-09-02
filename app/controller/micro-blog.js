'use strict';

const ViewController = require('../core/view-controller');

class MicroBlogController extends ViewController {
  async recommended() {
    const type = this.ctx.query.type || 'animal';
    const { microBlog } = this.ctx.service;

    const list = await microBlog.findRecommended(type);

    await this.render('micro-blog-recommended', {
      title: '推荐内容',
      activeMenuKey: type,
      list,
    });
  }
}

module.exports = MicroBlogController;
