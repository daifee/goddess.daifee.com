'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const PAGE_NAME = 'home';
    await this.ctx.render(PAGE_NAME, {
      pageName: PAGE_NAME,
      title: '首页标题',
    });
  }
}

module.exports = HomeController;
