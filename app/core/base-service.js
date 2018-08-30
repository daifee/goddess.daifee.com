'use strict';

const { Service } = require('egg');


class BaseService extends Service {
  handleMongooseError(error) {
    if (error.code === 11000) {
      this.ctx.throw(400, '已存在', { error });
    } else if (error.name === 'ValidationError') {
      this.ctx.throw(400, error.message, { error });
    } else {
      this.ctx.throw(503, error.message, { error });
    }
  }
}

module.exports = BaseService;
