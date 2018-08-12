/**
 * 图片
 */
'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  url: {
    type: String,
    index: true,
    required: true,
    maxlength: [ 400, '图片URL不能超过400个字符' ],
  },
  labelNames: [ String ],
  likeNum: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});


mongoose.model('Picture', schema);
