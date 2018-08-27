'use strict';

const BaseController = require('../../core/base-controller');
const objectUtil = require('../../util/object');

class UserController extends BaseController {
  async post() {
    const { request, model, service } = this.ctx;
    const { User } = model;
    const data = objectUtil.filter(request.body, 'name phone password repeatPassword');

    this.assert(data.password === data.repeatPassword, 10001);

    let user = new User(data);
    const error = user.validateSync();

    this.assert(!error, 10002, '', { error });

    user = await service.user.register(user);
    this.echo(user);
  }

  async authorize() {
    const { request, model, service } = this.ctx;
    const { User } = model;
    const data = objectUtil.filter(request.body, 'phone password');
    let user = new User(data);
    const error = user.validateSync('phone password');

    this.assert(!error, 10005, (error && error.message), { error });

    user = await service.user.dangerousFindByPhone(data.phone);

    this.assert(user, 10003);
    this.assert(user.verifyPassword(data.password), 10004);
    const responseData = user.toJSON();
    responseData.token = user.jwtSign();

    delete responseData.password;
    delete responseData.salt;

    this.echo(responseData);
  }
}

module.exports = UserController;
