'use strict';

const ViewController = require('../core/view-controller');

class MicroBlogController extends ViewController {
  async recommended() {
    const type = this.ctx.query.type || 'animal';

    await this.render('micro-blog-recommended', {
      title: '推荐内容',
      activeMenuKey: type,
    });
  }
}

module.exports = MicroBlogController;
