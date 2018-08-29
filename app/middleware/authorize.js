/**
 * 用户鉴权，并增加2个属性：ctx.user, request.user
 */
'use strict';

module.exports = (roles = []) => {
  return async function authorize(ctx, next) {
    const value = ctx.get('Authorization');

    ctx.assert(value, 401, '缺少Authorization');

    const values = value.split(/\s+/);
    const { User } = ctx.model;

    ctx.assert(values.length === 2, 403, 'Authorization格式错误');
    ctx.assert(values[0].toUpperCase() === 'BEARER', 403, 'Authorization格式错误');

    try {
      const decoded = User.jwtVerify(values[1]);
      ctx.user = ctx.request.user = decoded.user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ctx.throw(403, 'authorization已过期', { error });
      } else {
        ctx.throw(403, 'authorization不合法', { error });
      }
    }

    ctx.assert(roles.indexOf(ctx.user.role) !== -1, 403, '权限不够');

    await next();
  };
};

// 所有用户都有权
module.exports.user = module.exports([ 'normal', 'admin' ]);

module.exports.admin = module.exports([ 'admin' ]);
