'use strict';

const { Service } = require('egg');

class LikeService extends Service {
  // 添加收藏
  async create(doc) {
    const { Like } = this.ctx.model;
    // 不能是delete
    doc.status = 'normal';
    return await Like.findOneAndUpdate({
      targetId: doc.targetId,
    }, doc, {
      new: true,
      upsert: true,
    });
  }
  // 移除收藏
  async delete(targetId) {
    const { Like } = this.ctx.model;
    return await Like.findOneAndUpdate({
      targetId,
      status: { $ne: 'deleted' },
    }, {
      status: 'deleted',
    }, {
      new: true,
    });
  }

  async findByTargetId(targetId) {
    const { Like } = this.ctx.model;
    const query = Like.find({})
      .findOne({ targetId, status: { $ne: 'deleted' } });

    return await query.exec();
  }

  async findByTargetIds(targetIds) {
    const { Like } = this.ctx.model;
    const query = Like.find({})
      .find({ targetIds: { $in: targetIds }, status: { $ne: 'deleted' } });

    return await query.exec();
  }

  // 查询所有收藏
  async find(page = 1, perPage = 10) {
    const { Like } = this.ctx.model;
    const query = Like.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .find({ status: { $ne: 'deleted' } });

    return await query.exec();
  }
}

module.exports = LikeService;
