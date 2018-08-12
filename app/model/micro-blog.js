/**
 * 微博
 */
'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
    required: [ true, 'userId不能为空' ],
    maxlength: [ 100, '用户ID不能超过100个字符' ],
  },
  type: {
    type: String,
    required: [ true, 'type不能为空' ],
    enum: {
      values: [ 'picture' ],
      message: '未定义博文类型：{VALUE}',
    },
  },
  text: {
    type: String,
    maxlength: [ 140, '博文不能超过140个字符' ],
  },
  pictures: {
    type: [ String ],
    required: [ function() {
      return !!this.video || !!this.pictures.length;
    }, '必须发布图片或视频' ],
  },
  video: {
    type: String,
    required: [ function() {
      return !!this.video || !!this.pictures.length;
    }, '必须发布图片或视频' ],
  },
}, {
  timestamps: true,
});

mongoose.model('MicroBlog', schema);
