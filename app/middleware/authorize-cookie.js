/**
 * 用户鉴权，并增加2个属性：ctx.user, request.user
 */
'use strict';

module.exports = (roles = []) => {
  return async function authorize(ctx, next) {
    const value = ctx.cookies.get('Authorization', { signed: false });

    if (!value) {
      ctx.throw(14021);
    }

    const { User } = ctx.model;

    try {
      const decoded = User.jwtVerify(value);

      if (roles.indexOf(decoded.user.role) !== -1) {
        // 合法
        ctx.user = ctx.request.user = decoded.user;
      } else {
        ctx.throw(14022);
      }
    } catch (error) {
      if (error.code === 14022) {
        throw error;
      }

      if (error.name === 'TokenExpiredError') {
        ctx.throw(14023, '', { error });
      } else {
        ctx.throw(14024, '', { error });
      }
    }
    await next();
  };
};

// 所有用户都有权
module.exports.user = module.exports([ 'normal', 'admin' ]);

module.exports.admin = module.exports([ 'admin' ]);
