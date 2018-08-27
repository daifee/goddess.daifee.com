/**
 * 生产环境的配置
 */


'use strict';


module.exports = () => {
  const config = exports = {};

  // 异常处理器
  config.onerror = {
    // 不支持异步
    html(err, ctx) {
      ctx.renderError(err);
    },
  };

  return config;
};

