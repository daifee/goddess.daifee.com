'use strict';

const { Service } = require('egg');

class LabelService extends Service {

  async create(doc) {
    let result;
    const { Label } = this.ctx.model;
    try {
      result = await Label.create(doc);
    } catch (error) {
      if (error.code === 11000) {
        this.ctx.throw(400, '已存在该标签', { error });
      } else if (error.name === 'ValidationError') {
        this.ctx.throw(400, error.message, { error });
      } else {
        this.ctx.throw(503, error.message, { error });
      }
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
      if (error.code === 11000) {
        this.ctx.throw(400, '标签已存在', { error });
      } else if (error.name === 'ValidationError') {
        this.ctx.throw(400, error.message, { error });
      } else {
        this.ctx.throw(503, error.message, { error });
      }
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
