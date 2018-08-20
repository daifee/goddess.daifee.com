'use strict';

const Controller = require('egg').Controller;
const objectUtil = require('../util/object');

class UserController extends Controller {
  async post() {
    const { request, model, service } = this.ctx;
    const { User } = model;
    const data = objectUtil.filter(request.body, 'name phone password repeatPassword');

    if (data.password !== data.repeatPassword) {
      this.ctx.throw(10001);
    }

    let user = new User(data);
    const error = user.validateSync();

    if (error) {
      this.ctx.throw(10002, '', { error });
    }

    user = await service.user.register(user);
    this.ctx.echo(user);
  }

  async authorize() {
    const { request, model, service } = this.ctx;
    const { User } = model;
    const data = objectUtil.filter(request.body, 'phone password');
    let user = new User(data);

    const error = user.validateSync('phone password');
    if (error) {
      this.ctx.throw(10005, error.message, { error });
    }

    user = service.user.dangerousFindByPhone(data.phone);

    if (!user) {
      this.ctx.throw(10003);
    }

    if (!user.verifyPassword(data.password)) {
      this.ctx.throw(10004);
    }

    this.ctx.echo(user.jwtSign());
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
