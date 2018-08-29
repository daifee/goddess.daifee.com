'use strict';

const { Service } = require('egg');

class LikeService extends Service {
  // 添加收藏，定义`userId`参数是为了强调
  async create(userId, doc) {
    const { Like } = this.ctx.model;
    const obj = {
      userId,
      type: doc.type,
      targetId: doc.targetId,
      status: 'normal',
    };
    let result;

    try {
      result = await Like.findOneAndUpdate({
        targetId: obj.targetId,
        userId: obj.userId,
      }, obj, {
        new: true,
        upsert: true,
      });
    } catch (error) {
      if (error.code === 11000) {
        this.ctx.throw(400, '已收藏过', { error });
      } else if (error.name === 'ValidationError') {
        this.ctx.throw(400, error.message, { error });
      } else {
        this.ctx.throw(503, error.message, { error });
      }
    }

    return result;
  }
  // 移除收藏
  async delete(userId, targetId) {
    const { Like } = this.ctx.model;
    const query = Like.find()
      .update({ targetId, userId }, { status: 'deleted' });

    const result = await query.exec();
    return !!result.ok;
  }

  async findOne(userId, targetId) {
    const { Like } = this.ctx.model;
    const query = Like.find({})
      .findOne({ targetId, userId, status: { $ne: 'deleted' } });

    return await query.exec();
  }

  async findMulti(userId, targetIds) {
    const { Like } = this.ctx.model;
    const query = Like
      .find({
        userId,
        targetId: { $in: targetIds },
        status: { $ne: 'deleted' },
      }, {
        multi: true,
      });

    return await query.exec();
  }

  // 用户的收藏列表
  async find(userId, page = 1, perPage = 10) {
    const { Like } = this.ctx.model;
    const query = Like.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .find({ userId, status: { $ne: 'deleted' } });

    return await query.exec();
  }

  // 查询所有收藏
  async findAll(page = 1, perPage = 10) {
    const { Like } = this.ctx.model;
    const query = Like.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .find({ status: { $ne: 'deleted' } });

    return await query.exec();
  }

}

module.exports = LikeService;
