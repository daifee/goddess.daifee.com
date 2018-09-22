'use strict';

const ApiController = require('../../core/api-controller');

class BlogController extends ApiController {
  async list() {
    const blogs = await this.ctx.service.microBlog.find(this.page, this.perPage);
    this.echo(blogs);
  }
}

module.exports = BlogController;
