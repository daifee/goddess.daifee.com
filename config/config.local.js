/**
 * 本地开发环境的配置
 */

'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};


  config.cluster = {
    listen: {
      port: 7001,
    },
  };

  /**
   * 安全相关
   */
  // 机密，用于生成 authorization token
  config.secret = 'so easy';
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533867498821_8761';

  /**
   * 异常处理
   */
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

  /**
   * 配置mongoose
   */
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/goddess',
      options: {
        auth: {
          user: 'web',
          password: '123456',
        },
      },
    },
  };

  return config;
};
