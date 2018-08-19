'use strict';

const Controller = require('egg').Controller;
const objectUtil = require('../util/object');

class UserController extends Controller {
  async post() {
    const { request, model } = this.ctx;
    const { User } = model;
    const data = objectUtil.filter(request.body, 'name phone password repeatPassword');

    if (data.password !== data.repeatPassword) {
      this.ctx.throw(100001);
    }

    let user = new User(data);
    const error = user.validateSync();

    if (error) {
      this.ctx.throw(100002, { error });
    }

    user = await this.ctx.service.user.create(user);

    // TODO 响应 user数据和token
    this.ctx.echo(user.toJSON());
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
