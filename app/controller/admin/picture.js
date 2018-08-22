'use strict';

const Controller = require('egg').Controller;


class PictureController extends Controller {
  async list() {
    const { ctx } = this;
    const { query } = ctx.request;
    const pictures = ctx.service.picture.find(query.page, query.perPage);
    ctx.echo(pictures);
  }

  async update() {
    const { ctx } = this;
    const labelIds = ctx.request.body.labelIds;
    const doc = new ctx.module.Picture({ labelIds });
    const error = doc.validateSync('labelIds');

    if (error) {
      ctx.throw(10009, '', { error });
    }

    const picture = await ctx.service.picture.update(ctx.params.id, {
      labelIds,
    });
    ctx.echo(picture);
  }
}

module.exports = PictureController;
