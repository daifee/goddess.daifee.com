'use strict';

const BaseController = require('../core/base-controller');

class HomeController extends BaseController {
  async index() {
    await this.render('home', {
      title: '首页标题',
    });
  }
}

module.exports = HomeController;
