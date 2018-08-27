/**
 * 本地开发环境的配置
 */

'use strict';

module.exports = () => {
  const config = exports = {};

  // 配置异常处理器
  config.onerror = {

    // todo html
    json(error, ctx) {
      ctx.status = 200;
      ctx.body = {
        code: error.code,
        message: error.message,
        error,
      };
    },
  };

  return config;
};
