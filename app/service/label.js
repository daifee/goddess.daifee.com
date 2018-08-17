'use strict';

const { Service } = require('egg');

class LabelService extends Service {

  async create(doc) {
    const { Label } = this.ctx.model;
    const label = await Label.create(doc);
    return label;
  }

  async update(id, obj) {
    const { Label } = this.ctx.model;

    const query = Label.find({})
      .findOneAndUpdate({ _id: id }, obj, { new: true });

    const label = await query.exec();

    return label;
  }

  async delete(id) {
    return await this.update(id, { status: 'deleted' });
  }

  /**
   * 查找所有标签
   * @return {Array} 标签集合
   */
  async find() {
    const { Label } = this.ctx.model;
    const query = Label.find({})
      .find({ status: { $ne: 'deleted' } });

    return await query.exec();
  }
}

module.exports = LabelService;
