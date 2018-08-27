/**
 * 本地开发环境的配置
 */

'use strict';
const path = require('path');

module.exports = appInfo => {
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

  /**
   * 配置assets
   */
  config.assets = {
    publicPath: 'http://localhost:8080',
    outputPath: path.resolve(appInfo.baseDir, './.guido-cache/dist'),
  };


  return config;
};
