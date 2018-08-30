'use strict';

const Service = require('../core/base-service');

class LabelService extends Service {

  async create(doc) {
    let result;
    const { Label } = this.ctx.model;
    try {
      result = await Label.create(doc);
    } catch (error) {
      this.handleMongooseError(error);
    }
    return result;
  }

  async update(id, obj) {
    const { Label } = this.ctx.model;
    const query = Label.find({})
      .findOneAndUpdate(
        { _id: id, status: { $ne: 'deleted' } },
        obj,
        { new: true }
      );
    let result;

    try {
      result = await query.exec();
    } catch (error) {
      this.handleMongooseError(error);
    }

    return result;
  }

  async delete(id) {
    const { Label } = this.ctx.model;
    const query = Label.find({})
      .update({ _id: id }, { status: 'deleted' });

    const result = await query.exec();
    return !!result.ok;
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
