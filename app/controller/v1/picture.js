'use strict';

const ApiController = require('../../core/api-controller');

class PictureController extends ApiController {
  async getMultiple() {
    let urls = this.ctx.query.urls || '';
    urls = urls.split(',');
    const result = await this.ctx.service.picture.findMultiple(urls);
    this.echo(result);
  }
}

module.exports = PictureController;
