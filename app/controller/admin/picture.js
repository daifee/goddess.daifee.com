'use strict';

const BaseController = require('../../core/base-controller');

class PictureController extends BaseController {
  async list() {
    const { ctx } = this;
    const { query } = ctx.request;
    const pictures = ctx.service.picture.find(query.page, query.perPage);
    this.echo(pictures);
  }

  async update() {
    const { ctx } = this;
    const labelIds = ctx.request.body.labelIds;
    const doc = new ctx.module.Picture({ labelIds });
    const error = doc.validateSync('labelIds');

    this.assert(!error, 10009, '', { error });

    const picture = await ctx.service.picture.update(ctx.params.id, {
      labelIds,
    });
    this.echo(picture);
  }
}

module.exports = PictureController;
