'use strict';

const BaseController = require('../core/base-controller');

class HomeController extends BaseController {
  async login() {
    await this.render('login', {
      title: '登录',
    });
  }

  async register() {
    await this.render('register', {
      title: '注册',
    });
  }

  async react() {
    await this.render('react', {
      pageName: 'react-page',
      title: '登录',
    });
  }
}

module.exports = HomeController;
