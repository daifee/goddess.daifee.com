/**
 * 线上测试环境的配置
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
    publicPath: 'https://remote-domian/asset/root/path',
    outputPath: path.resolve(appInfo.baseDir, './app/public/dist-sit'),
  };

  return config;
};
