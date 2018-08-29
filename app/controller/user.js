'use strict';

const ViewController = require('../core/view-controller');

class UserController extends ViewController {

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
