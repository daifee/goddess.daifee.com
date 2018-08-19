/**
 * 收藏
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
    type: {
      type: String,
      required: [ true, 'type不能为空' ],
      enum: {
        values: [ 'picture', 'video' ],
        message: '未定义博文类型：{VALUE}',
      },
    },
    // 收藏目标的ID（可能是：ObjectId, 资源url）
    targetId: {
      type: String,
      unique: true,
      index: true,
      required: [ true, 'targetId不能为空' ],
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

  return mongoose.model('Like', schema);
};
