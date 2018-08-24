/**
 * 线上测试环境的配置
 */

'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};
  const {
    PORT,
  } = process.env;
  /**
   * 配置assets
   */
  config.assets = {
    publicPath: `http://127.0.0.1:${PORT}/public/dist-sit`,
    outputPath: path.resolve(appInfo.baseDir, './app/public/dist-sit'),
  };

  return config;
};
