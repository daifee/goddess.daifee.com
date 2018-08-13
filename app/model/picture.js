/**
 * 图片
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;

  const schema = new mongoose.Schema({
    url: {
      type: String,
      index: true,
      required: true,
      maxlength: [ 400, '图片URL不能超过400个字符' ],
    },
    labelIds: [ String ],
    likeNum: {
      type: Number,
      default: 0,
    },
  }, {
    timestamps: true,
  });


  return mongoose.model('Picture', schema);
};
