'use strict';

const ApiController = require('../../core/api-controller');

class UserController extends ApiController {
  async list() {
    const users = await this.ctx.service.user.find(this.page, this.perPage);
    this.echo(users);
  }
}

module.exports = UserController;
