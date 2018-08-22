'use strict';

const BaseController = require('../base');

class LikeController extends BaseController {
  async list() {
    const { params, user, query, service } = this.ctx;

    this.assertUser(params.userId);

    const likes = await service.like.find(user.id, query.page, query.perPage);
    this.ctx.echo(likes);
  }

  async create() {
    const { params, request, model, user, service } = this.ctx;
    if (params.userId !== user.id) {
      this.ctx.throw(14013);
    }

    const doc = new model.Like({
      userId: user.id,
      type: request.body.type,
      targetId: request.body.targetId,
    });

    const error = doc.validateSync();
    if (error) {
      this.ctx.throw(14014);
    }

    const like = service.like.create(doc);
    this.ctx.echo(like);
  }

  async delete() {
    const { ctx } = this;
    const { params, user, service } = ctx;

    if (params.userId !== user.id) {
      ctx.throw(14011);
    }

    const result = await service.like.delete(params.likeId);
    ctx.echo(result);
  }
}

module.exports = LikeController;
