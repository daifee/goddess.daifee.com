'use strict';

const ApiController = require('../../core/api-controller');

class TencentCosController extends ApiController {
  async getTempKeys() {
    console.log(this.user.id);
    const prefix = `${this.user.id}/*`;
    const result = await this.ctx.service.tencentCos.getTempKeys(prefix);
    this.echo(result);
  }
}

module.exports = TencentCosController;
