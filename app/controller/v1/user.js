'use strict';

const Controller = require('egg').Controller;
const objectUtil = require('../../util/object');

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

    user = await service.user.dangerousFindByPhone(data.phone);

    if (!user) {
      this.ctx.throw(10003);
    }

    if (!user.verifyPassword(data.password)) {
      this.ctx.throw(10004);
    }

    this.ctx.echo(user.jwtSign());
  }
}

module.exports = UserController;
