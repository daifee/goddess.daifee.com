'use strict';

module.exports = () => {
  return async function cros(ctx, next) {
    // /api/*请求
    if (ctx.path.indexOf('/api/') === 0) {
      ctx.set('Access-Control-Allow-Origin', '*');
      // options 请求
      if (ctx.method.toUpperCase() === 'OPTIONS') {
        const requestHeaders = ctx.get('Access-Control-Request-Headers');

        ctx.set('Access-Control-Allow-Methods', 'DELETE, GET, PUT, POST, OPTIONTS');
        ctx.set('Access-Control-Allow-Headers', requestHeaders);
        // 缓存一天
        ctx.set('Access-Control-Max-Age', 60 * 60 * 24);
        ctx.body = 'allow cros';
        return;
      }
    }

    await next();
  };
};
