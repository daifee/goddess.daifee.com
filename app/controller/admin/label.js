'use strict';

const Controller = require('egg').Controller;
const objectUtil = require('../../util/object');

class LabelController extends Controller {
  async list() {
    const { ctx } = this;
    const labels = await ctx.service.label.find();
    ctx.echo(labels);
  }

  async create() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const { Label } = ctx.model;
    const doc = new Label({
      userId: ctx.user.id,
      name: requestBody.name,
      description: requestBody.description,
    });

    const error = doc.validateSync();
    if (error) {
      ctx.throw(10006, '', { error });
    }

    const label = await ctx.service.label.create(doc);
    ctx.echo(label);
  }

  async update() {
    const { ctx } = this;
    const data = objectUtil.filter(ctx.request.body, 'name description');
    const doc = new ctx.model.Label(data);
    const error = doc.validateSync(Object.keys(data));

    if (error) {
      ctx.throw(10007, '', { error });
    }

    const label = await ctx.service.label.update(ctx.params.id, data);

    if (!label) {
      ctx.throw(10008);
    }

    ctx.echo(label);
  }

  async delete() {
    const { ctx } = this;
    const result = await ctx.service.label.delete(ctx.params.id);
    ctx.echo(result);
  }
}

module.exports = LabelController;
