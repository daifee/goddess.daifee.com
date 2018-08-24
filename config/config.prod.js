/**
 * 生产环境的配置
 */


'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};


  /**
   * 安全相关
   */
  // 机密，用于生成 authorization token
  config.secret = process.env.SECRET;
  // use for cookie sign key, should change to your own and keep security
  config.keys = process.env.KEYS;

  config.mongoose = {
    url: process.env.MONGO_URL,
    options: {
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
    },
  };


  /**
   * 配置assets
   */
  config.assets = {
    publicPath: 'https://cdn-doamin/asset/root/path',
    // `npm run build-assets`命令用到`outputPath`路径，所以修改这里就要同时修改`npm run build-assets`
    outputPath: path.resolve(appInfo.baseDir, './app/public/dist-prod'),
  };

  /**
   * 配置异常处理器
   */
  config.onerror = {
    // 不支持异步
    html(err, ctx) {
      ctx.renderError(err);
    },
    json(err, ctx) {
      ctx.status = 200;
      ctx.body = {
        code: err.code,
        message: err.message,
      };
    },
  };

  return config;
};
