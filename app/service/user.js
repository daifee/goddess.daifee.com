'use strict';

const Service = require('../core/base-service');

class UserService extends Service {
  /**
   * 注册用户
   *
   * @param {User} user 通过验证的user对象
   * @return {Object} 拥有`token`属性的`user`对象
   * @memberof UserService
   */
  async register(user) {
    user = await this.create(user);
    const result = user.toJSON();
    result.token = user.jwtSign();

    this.ctx.service.tokenLog.log(result.id, result.token);

    return result;
  }

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
    } catch (error) {
      this.ctx.throw(501, error.message, { error });
    }

    try {
      user = await User.create(doc);
    } catch (error) {
      this.handleMongooseError(error);
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

  async dangerousFindByPhone(phone) {
    const { User } = this.ctx.model;

    const query = User.find({});
    const filter = { phone, status: { $ne: 'deleted' } };
    const projection = '';

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
