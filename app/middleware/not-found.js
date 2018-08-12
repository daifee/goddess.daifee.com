'use strict';


module.exports = () => {
  return async function handleNotFound(ctx, next) {
    await next();

    if (ctx.status === 404 || !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          message: 'Not Found',
        };
        ctx.status = 404;
      } else {
        const PAGE_NAME = 'not-found';
        await ctx.render(PAGE_NAME, { pageName: PAGE_NAME });
      }
    }
  };
};

