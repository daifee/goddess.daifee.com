'use strict';

const BaseController = require('../core/base-controller');

class UserController extends BaseController {

  async profile() {
    await this.render('user-profile', {
      title: '用户主页',
      name: this.ctx.params.name,
    });
  }

  async list() {
    await this.render('user-list', {
      title: '用户列表页',
    });
  }

  async edit() {
    await this.render('react', {
      pageName: 'user-edit',
      title: '修改用户信息',
    });
  }

  async login() {
    await this.render('react', {
      pageName: 'login',
      title: '登录',
    });
  }
}

module.exports = UserController;
