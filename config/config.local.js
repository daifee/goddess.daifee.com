/**
 * 本地开发环境的配置
 */

'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  /**
   * assets
   */
  config.assets = {
    outputPath: path.resolve(appInfo.baseDir, './app/public', 'dist-local'),
    publicPath: 'http://localhost:8080',
  };

  return config;
};
