'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async profile() {
    const PAGE_NAME = 'user-profile';
    await this.ctx.render(PAGE_NAME, {
      pageName: PAGE_NAME,
      title: '用户主页',
      name: this.ctx.params.name,
    });
  }

  async list() {
    const PAGE_NAME = 'user-list';
    await this.ctx.render(PAGE_NAME, {
      pageName: PAGE_NAME,
      title: '用户列表页',
    });
  }

  async edit() {
    await this.ctx.render('react', {
      pageName: 'user-edit',
      title: '修改用户信息',
    });
  }

  async login() {
    await this.ctx.render('react', {
      pageName: 'login',
      title: '登录',
    });
  }
}

module.exports = UserController;
