/**
 * JWT
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;

  const schema = new mongoose.Schema({
    // 所属用户的ID
    userId: {
      type: String,
      required: [ true, '不能缺少userId' ],
    },
    token: {
      type: String,
      unique: true,
      index: true,
      required: [ true, '不能缺少token' ],
    },
  }, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
  });

  return mongoose.model('TokenLog', schema);
};
