'use strict';

const BaseController = require('../../core/base-controller');

class PictureController extends BaseController {
  async list() {
    const { ctx } = this;
    const { query } = ctx.request;
    const pictures = await ctx.service.picture.find(query.page, query.perPage);

    this.echo(pictures);
  }

  async update() {
    const { ctx } = this;
    const labelIds = ctx.request.body.labelIds;
    const doc = new ctx.model.Picture({ labelIds });
    const error = doc.validateSync('labelIds');

    this.assert(!error, 400, (error && error.message), { error });

    const picture = await ctx.service.picture.update(ctx.params.id, {
      labelIds,
    });
    this.echo(picture);
  }
}

module.exports = PictureController;
