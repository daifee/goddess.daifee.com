'use strict';

const BaseController = require('../core/base-controller');

class HomeController extends BaseController {
  async logout() {
    this.ctx.cookies.set('Authorization', '', { maxAge: -1 });
    this.ctx.redirect('/');
  }

  async login() {
    if (this.ctx.getCookieUser()) {
      return this.ctx.redirect('/');
    }

    await this.render('login', {
      title: '登录',
    });
  }

  async register() {
    if (this.ctx.getCookieUser()) {
      return this.ctx.redirect('/');
    }

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
