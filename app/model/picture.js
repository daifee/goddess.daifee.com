/**
 * 图片
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;

  const schema = new mongoose.Schema({
    userId: {
      type: String,
      required: [ true, '不能缺少userId' ],
    },
    labelIds: [ String ],
    url: {
      type: String,
      index: true,
      required: true,
      unique: true,
      maxlength: [ 400, '图片URL不能超过400个字符' ],
    },
    likeNum: {
      type: Number,
      default: 0,
    },
    // 状态
    status: {
      type: String,
      default: 'normal',
      // 正常，已删除
      enum: [ 'normal', 'deleted' ],
    },
  }, {
    timestamps: true,
  });


  return mongoose.model('Picture', schema);
};
