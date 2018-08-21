'use strict';


module.exports = () => {
  return async function handleNotFound(ctx, next) {
    await next();

    if (ctx.status === 404 || !ctx.body) {
      ctx.status = 404;

      if (ctx.acceptJSON) {
        ctx.body = {
          code: 404,
          message: 'Not Found',
        };
      } else {
        const PAGE_NAME = 'not-found';
        await ctx.render(PAGE_NAME, { pageName: PAGE_NAME });
      }
    }
  };
};

