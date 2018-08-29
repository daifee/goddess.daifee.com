'use strict';

const BaseController = require('../../core/base-controller');
const objectUtil = require('../../util/object');

class LabelController extends BaseController {
  async list() {
    const labels = await this.ctx.service.label.find();
    this.echo(labels);
  }

  async create() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const { Label } = ctx.model;
    const doc = new Label({
      userId: this.user.id,
      name: requestBody.name,
      description: requestBody.description,
    });

    const error = doc.validateSync();
    this.assert(!error, 400, (error && error.message), { error });

    const label = await ctx.service.label.create(doc);
    this.echo(label);
  }

  async update() {
    const { ctx } = this;
    const data = objectUtil.filter(ctx.request.body, 'name description');
    const doc = new ctx.model.Label(data);
    const error = doc.validateSync(Object.keys(data));

    this.assert(!error, 400, (error && error.message), { error });

    const label = await ctx.service.label.update(ctx.params.id, data);

    this.assert(label, 503, '更新失败');
    this.echo(label);
  }

  async delete() {
    const result = await this.ctx.service.label.delete(this.ctx.params.id);
    this.echo(result);
  }
}

module.exports = LabelController;
