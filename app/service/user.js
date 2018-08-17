'use strict';

const { Service } = require('egg');

class UserService extends Service {
  /**
   * 创建新用户
   * @param {User} doc 用户对象
   * @return {User} 新用户对象
   */
  async create(doc) {
    const { User } = this.ctx.model;
    doc.encryptPassword();
    const user = await User.create(doc);

    return user;
  }

  //
  async findByPhone(phone) {
    const { User } = this.ctx.model;

    const query = User.find({});
    const filter = { phone, status: { $ne: 'deleted' } };
    const projection = '-password -salt';

    const user = await query.findOne(filter, projection).exec();

    return user;
  }

  //
  async findById(id) {
    const { User } = this.ctx.model;

    const query = User.find({});
    const filter = { _id: id, status: { $ne: 'deleted' } };
    const projection = '-password -salt';

    const user = await query.findOne(filter, projection).exec();

    return user;
  }
}

module.exports = UserService;
