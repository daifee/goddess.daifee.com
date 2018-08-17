'use strict';

const { Service } = require('egg');

class PictureService extends Service {
  // 创建图片
  async create(doc) {
    const { Picture } = this.ctx.model;
    return await Picture.create(doc);
  }

  // 更新
  async update(id, obj) {
    const query = this.ctx.model.Picture.find({})
      .findOneAndUpdate({ _id: id }, obj, { new: true });

    return await query.exec();
  }

  // 删除
  async delete(id) {
    return await this.update(id, { status: 'deleted' });
  }

  // 查找，分页
  async find(page = 1, perPage = 10) {
    const query = this.ctx.model.Picture.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .find({ status: { $ne: 'deleted' } });

    return query.exec();
  }
}

module.exports = PictureService;
