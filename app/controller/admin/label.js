'use strict';

const Controller = require('egg').Controller;

class LabelController extends Controller {
  async list() {
    const { ctx } = this;
    const labels = await ctx.service.label.find();
    ctx.echo(labels);
  }
}

module.exports = LabelController;
