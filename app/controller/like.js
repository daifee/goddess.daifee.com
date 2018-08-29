'use strict';

const ViewController = require('../core/view-controller');

class LikeController extends ViewController {
  async list() {
    if (!this.user) {
      return this.ctx.redirect('/login');
    }

    await this.render('like-list', {
      title: '我的收藏',
    });
  }
}

module.exports = LikeController;
