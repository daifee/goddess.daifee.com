/**
 * 单元测试环境的配置
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


  // 单元测试就不需要在终端打印日志
  config.logger = {
    consoleLevel: 'NONE',
  };

  return config;
};
