'use strict';

const ViewController = require('../core/view-controller');

class HomeController extends ViewController {
  async logout() {
    super.logout();
    this.ctx.redirect('/');
  }

  async test() {
    this.ctx.body = '<h1>goddess.daifee.com</h1><p>Egg程序</p>';
  }

  async wetest() {
    // this.ctx.body = 'wetest-a3522a1756f1d80968709444bc64f396.txt';
    return this.ctx.redirect('/static/wetest.txt', 301);
  }

  async login() {
    if (this.user) {
      return this.ctx.redirect(`/users/${this.user.id}`);
    }

    await this.render('login', {
      title: '登录',
    });
  }

  async register() {
    if (this.user) {
      return this.ctx.redirect(`/users/${this.user.id}`);
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

  async about() {
    await this.render('about.ejs', {
      title: '关于 daifee',
    });
  }
}

module.exports = HomeController;
