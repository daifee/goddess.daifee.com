'use strict';

const { Service } = require('egg');

class UserService extends Service {
  /**
   * 创建新用户
   * @param {User} model 用户对象
   * @return {User} 新用户对象
   */
  async create(model) {
    const { User } = this.ctx.model;
    model.encryptPassword();
    const user = await User.create(model);

    return user;
  }

  async findByPhone(phone) {
    const { User } = this.ctx.model;
    const filter = '-password -salt';
    const user = await User.findOne({ phone }, filter);
    return user;
  }
}

module.exports = UserService;
