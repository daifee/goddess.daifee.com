'use strict';

const { Service } = require('egg');

class LikeService extends Service {
  // 添加收藏
  async create(doc) {
    // todo
  }
  // 移除收藏
  async delete(id) {
    // todo
  }
  // 查询收藏（全部，分页，条件：类型）
  async find(page = 1, perPage = 10, query = {}) {
    // todo
  }
}

module.exports = LikeService;
