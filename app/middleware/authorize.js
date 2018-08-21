'use strict';

module.exports = (roles = []) => {
  return async function authorize(ctx, next) {
    const value = ctx.get('Authorization');

    if (!value) {
      ctx.throw(14001);
    }

    const values = value.split(/\s+/);
    const { User } = ctx.model;

    if (values.length !== 2) {
      ctx.throw(14002);
    }

    if (values[0].toUpperCase() !== 'BEARER') {
      ctx.throw(14003);
    }

    try {
      const decoded = User.jwtVerify(values[1]);
      if (roles.indexOf(decoded.user.role) !== -1) {
        // 合法
        await next();
      } else {
        ctx.throw(14005);
      }
    } catch (error) {
      if (error.code === 14005) {
        throw error;
      }

      if (error.name === 'TokenExpiredError') {
        ctx.throw(14004, '', { error });
      } else {
        ctx.throw(14006, '', { error });
      }
    }
  };
};

// 所有用户都有权
module.exports.user = module.exports([ 'normal', 'admin' ]);

module.exports.admin = module.exports([ 'admin' ]);
