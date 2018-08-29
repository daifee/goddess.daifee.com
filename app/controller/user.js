'use strict';

const BaseController = require('../core/base-controller');

class UserController extends BaseController {

  async profile() {
    if (!this.user) {
      return this.ctx.redirect('/login');
    }

    await this.render('user-profile', {
      title: '用户主页',
      activeMenuKey: 'profile',
    });
  }

}

module.exports = UserController;
