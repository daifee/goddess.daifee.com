'use strict';

const ApiController = require('../../core/api-controller');
const objectUtil = require('../../util/object');

class MicroBlogController extends ApiController {
  async list() {
    const { ctx } = this;
    const { params, query } = ctx;
    this.assertUser(params.userId);

    const blogs = await ctx.service.microBlog.findByUserId(
      params.userId,
      query.page,
      query.perPage
    );
    this.echo(blogs);
  }

  async create() {
    const { ctx } = this;
    const { params, request, service, model } = ctx;

    this.assertUser(params.userId);

    const data = objectUtil.filter(request.body, 'pictureUrls text');
    Object.assign(data, { userId: params.userId });
    const doc = new model.MicroBlog(data);

    const error = doc.validateSync();
    this.assert(!error, 400, (error && error.message), { error });

    const blog = await service.microBlog.create(doc);
    this.echo(blog);
  }

  async update() {
    const { ctx } = this;
    const { params, request, service, model } = ctx;

    this.assertUser(params.userId);

    const data = objectUtil.filter(request.body, 'pictureUrls text');
    const doc = new model.MicroBlog(data);

    const error = doc.validateSync(Object.keys(data));

    this.assert(!error, 400, (error && error.message), { error });

    const blog = await service.microBlog.update(params.blogId, data);
    this.echo(blog);
  }

  async delete() {
    const { ctx } = this;
    const { params, service } = ctx;

    this.assertUser(params.userId);

    const result = await service.microBlog.delete(params.blogId);
    this.echo(result);
  }
}

module.exports = MicroBlogController;
