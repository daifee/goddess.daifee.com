'use strict';

const BaseController = require('../core/base-controller');

class LikeController extends BaseController {
  async list() {
    if (!this.ctx.getCookieUser()) {
      return this.ctx.redirect('/login');
    }

    await this.render('like-list', {
      title: '我的收藏',
    });
  }
}

module.exports = LikeController;
