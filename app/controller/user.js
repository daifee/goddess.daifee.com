'use strict';

const BaseController = require('../core/base-controller');

class UserController extends BaseController {

  async profile() {
    await this.render('user-profile', {
      title: '用户主页',
    });
  }

}

module.exports = UserController;
