/**
 * 用户
 */
'use strict';

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

  return mongoose.model('User', schema);
};
