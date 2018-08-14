/**
 * 用户
 */
'use strict';

// const crypto = require('crypto');

module.exports = app => {
  const { mongoose } = app;

  const schema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [ true, '用户名不能为空' ],
      maxlength: [ 40, '用户名不能超过40个字符' ],
    },
    avatar: {
      type: String,
      match: [ /^http(s)?:\/\//, '头像URL格式不正确' ],
      maxlength: [ 400, '头像URL不能超过400个字符' ],
    },
    email: {
      type: String,
      unique: true,
      trip: true,
      match: [ /^[^@]+@[^@.]+(\.[^@.]+)+$/, '邮箱格式不正确' ],
    },
    role: {
      type: String,
      default: 'normal',
      enum: {
        values: [ 'normal', 'admin' ],
        message: '没有这个角色：{VALUE}',
      },
    },
    introduction: {
      type: String,
      maxlength: [ 140, '简介不能超过140个字符' ],
    },
    password: {
      type: String,
      required: [ true, '密码不能为空' ],
      minlength: [ 6, '密码不能少于6个字符' ],
      maxlength: [ 60, '密码不能多于60个字符' ],
    },
    // 私有盐
    salt: {
      type: String,
      default() {
        return Date.now() + '';
      },
    },
    // 标识
    token: {
      type: String,
      unique: true,
      maxlength: [ 100, 'token不能超过100个字符' ],
    },
    // 状态
    status: {
      type: String,
      default: 'normal',
      // 正常，已删除，被屏蔽（不能发言、评论）
      enum: [ 'normal', 'deleted', 'blocked' ],
    },
  }, {
    toJSON: { virtuals: true, getters: true },
    timestamps: true,
  });


  // /**
  //  * 创建token
  //  *
  //  * @param {ObjectId} id 用户ID
  //  * @param {String} password 加密后的密码
  //  * @return {String} token
  //  */
  // function createToken(id, password) {
  //   const hmac = crypto.createHmac('sha256', password);
  //   const token = hmac.update(id).digest('hex');

  //   return token;
  // }


  // /**
  //  * 对用户密码进行加密（加密后才能存库）
  //  *
  //  * @param {string} password 用户输入的密码
  //  * @param {string} salt User的salt
  //  * @return {string} password
  //  */
  // function encryptPassword(password, salt) {
  //   const hmac = crypto.createHmac('sha256', password);
  //   password = hmac.update(salt).digest('hex');

  //   return password;
  // }


  return mongoose.model('User', schema);
};

