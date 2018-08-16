'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async post() {
    const { request, model } = this.ctx;
    const { User } = model;
    const data = request.body;

    if (data.password !== data.repeatPassword) {
      // TODO 定义 error code
      this.ctx.throw();
    }

    // TODO 过滤，只留必要字段
    const user = new User(data);

    if (user.validateSync()) {
      // TODO 定义 error code
      this.ctx.throw();
    }

    // TODO insert to db

    // TODO 响应 user数据和token
  }

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
