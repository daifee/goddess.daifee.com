'use strict';

const BaseController = require('../../core/base-controller');

class TencentCosController extends BaseController {
  async getTempKeys() {
    const prefix = `${this.user.id}/*`;
    const result = await this.ctx.service.tencentCos.getTempKeys(prefix);
    this.echo(result);
  }
}

module.exports = TencentCosController;
