'use strict';

const { Service } = require('egg');

class TokenLogService extends Service {
  async create(doc) {
    const { TokenLog } = this.ctx.model;

    try {
      await TokenLog.create(doc);
    } catch (error) {
      this.ctx.app.logger.error('记录token：' + error.message);
    }
  }
}


module.exports = TokenLogService;
