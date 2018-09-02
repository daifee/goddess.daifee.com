'use strict';

const { Controller } = require('egg');


class BaseController extends Controller {
  get page() {
    return Number(this.ctx.query.page) || 1;
  }

  get perPage() {
    return Number(this.ctx.query.perPage) || 10;
  }
}

module.exports = BaseController;
