'use strict';

const Controller = require('egg').Controller;
const objectUtil = require('../../util/object');

class MicroBlogController extends Controller {
  async list() {
    const { ctx } = this;
    const { params, query, user } = ctx;

    if (user.id !== params.userId) {
      ctx.throw(14007);
    }

    const blogs = await ctx.service.microBlog.findByUserId(
      user.id,
      query.page,
      query.perPage
    );
    ctx.echo(blogs);
  }

  async create() {
    const { ctx } = this;
    const { params, user, request, service, model } = ctx;

    if (user.id !== params.userId) {
      ctx.throw(14008);
    }

    const data = objectUtil.filter(request.body, 'pictureUrls text');
    Object.assign(data, { userId: user.id });
    const doc = new model.MicroBlog(data);

    const error = doc.validateSync();
    if (error) {
      ctx.throw(10010, '', { error });
    }
    const blog = await service.microBlog.create(doc);
    ctx.echo(blog);
  }

  async update() {
    const { ctx } = this;
    const { params, user, request, service, model } = ctx;

    if (params.userId !== user.id) {
      ctx.throw(14009);
    }

    const data = objectUtil.filter(request.body, 'pictureUrls text');
    const doc = new model.MicroBlog(data);

    const error = doc.validateSync(Object.keys(data));
    if (error) {
      ctx.throw(10011, '', { error });
    }

    const blog = await service.microBlog.update(params.blogId, data);
    ctx.echo(blog);
  }

  async delete() {
    const { ctx } = this;
    const { params, user, service } = ctx;

    if (params.userId !== user.id) {
      ctx.throw(14010);
    }

    const result = await service.microBlog.delete(params.blogId);
    ctx.echo(result);
  }
}

module.exports = MicroBlogController;
