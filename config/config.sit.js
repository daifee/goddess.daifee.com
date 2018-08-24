/**
 * 线上测试环境的配置
 */

'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  /**
   * 配置assets
   */
  config.assets = {
    // publicPath: `http://127.0.0.1:${PORT}`,
    outputPath: path.resolve(appInfo.baseDir, './app/public/dist-sit'),
  };

  return config;
};
