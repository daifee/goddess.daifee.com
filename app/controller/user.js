'use strict';

const url = require('url');
const ViewController = require('../core/view-controller');


class UserController extends ViewController {

  async profile() {
    if (!this.user) {
      return this.ctx.redirect('/login');
    }

    const { microBlog } = this.ctx.service;
    const page = this.page;
    const perPage = this.perPage;
    const list = await microBlog.findByUserId(this.user.id, { page, perPage });


    const prevPage = page - 1;
    const nextPage = page + 1;
    const request = this.ctx.request;
    const prevPageUrl = prevPage < 1 ? '' : url.format({
      pathname: request.path,
      query: Object.assign({}, request.query, { page: prevPage }),
    });
    const nextPageUrl = url.format({
      pathname: request.path,
      query: Object.assign({}, request.query, { page: nextPage }),
    });

    await this.render('user-profile', {
      title: '用户主页',
      activeMenuKey: 'profile',
      list,
      page,
      prevPageUrl,
      nextPageUrl,
    });
  }

}

module.exports = UserController;
