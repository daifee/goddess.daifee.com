'use strict';

const BaseController = require('../../core/base-controller');

class LikeController extends BaseController {
  async list() {
    const { params, query, service } = this.ctx;

    this.assertUser(params.userId);

    const likes = await service.like.find(params.userId, query.page, query.perPage);
    this.echo(likes);
  }

  async create() {
    const { params, request, model, service } = this.ctx;
    this.assertUser(params.userId);

    const doc = new model.Like({
      userId: params.userId,
      type: request.body.type,
      targetId: request.body.targetId,
    });

    const error = doc.validateSync();
    this.assert(!error, 10012, (error && error.message), { error });

    const like = service.like.create(doc);
    this.echo(like);
  }

  async delete() {
    const { ctx } = this;
    const { params, service } = ctx;

    this.assertUser(params.userId);

    const result = await service.like.delete(params.likeId);
    this.echo(result);
  }
}

module.exports = LikeController;
