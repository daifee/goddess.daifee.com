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
    let user;

    try {
      doc.encryptPassword();
      user = await User.create(doc);
    } catch (err) {
      if (err.code === 11000) {
        this.ctx.throw(20001, '', { error: err });
      } else if (err.name === 'ValidationError') {
        this.ctx.throw(20002, err.message, { error: err });
      } else {
        this.ctx.throw(20003, err.message, { error: err });
      }
    }
    // 不暴露
    user.password = undefined;
    user.salt = undefined;

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
