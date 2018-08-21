/**
 * 转换分页参数数据类型
 */
'use strict';


module.exports = () => {
  return async function pagination(ctx, next) {
    // page, perPage
    if (ctx.query.page) {
      ctx.query.page = parseInt(ctx.query.page, 10);
      // 从第一页开始
      if (ctx.query.page < 1) {
        ctx.query.page = 1;
      }
    }

    if (ctx.query.perPage) {
      ctx.query.perPage = parseInt(ctx.query.perPage, 10);
      // 小于1就没意思了
      if (ctx.query.perPage < 1) {
        ctx.query.perPage = 1;
      }
    }

    await next();
  };
};
