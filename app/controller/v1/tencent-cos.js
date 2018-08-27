'use strict';

const BaseController = require('../../core/base-controller');

class TencentCosController extends BaseController {
  async getTempKeys() {
    const result = await this.ctx.service.tencentCos.getTempKeys();
    this.echo(result);
  }
}

module.exports = TencentCosController;
