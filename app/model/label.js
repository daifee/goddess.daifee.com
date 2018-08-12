/**
 * 标签
 */
'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    index: true, // 索引
    required: true,
    maxlength: [ 10, '标签名不能超过10个字符' ],
  },
  description: {
    type: String,
    maxlength: [ 240, '标签描述不能超过140个字符' ],
  },
}, {
  timestamps: true,
});

mongoose.model('Label', schema);
