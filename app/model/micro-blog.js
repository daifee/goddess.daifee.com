/**
 * 微博
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;

  const schema = new mongoose.Schema({
    userId: {
      type: String,
      index: true,
      required: [ true, 'userId不能为空' ],
      maxlength: [ 100, '用户ID不能超过100个字符' ],
    },
    user: {
      type: Object,
    },
    pictureUrls: {
      type: [ String ],
      required: [ function() {
        return !this.videoUrl && !this.pictureUrls.length;
      }, '必须发布图片或视频' ],
    },
    videoUrl: {
      type: String,
      required: [ function() {
        return !this.videoUrl && !this.pictureUrls.length;
      }, '必须发布图片或视频' ],
    },
    type: {
      type: String,
      default: 'picture',
      enum: {
        values: [ 'picture', 'video' ],
        message: '未定义博文类型：{VALUE}',
      },
    },
    recommended: {
      type: String,
      enum: {
        values: [ 'goddess', 'landscape', 'animal' ],
        message: '未定义博文专题：{VALUE}',
      },
    },
    recommendedTime: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
    text: {
      type: String,
      maxlength: [ 140, '博文不能超过140个字符' ],
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
    toJSON: { virtuals: true, getters: true },
  });

  return mongoose.model('MicroBlog', schema);
};
