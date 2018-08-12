/**
 * 本地开发环境的配置
 */

'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  /**
   * 配置assets
   */
  config.assets = {
    publicPath: 'http://localhost:8080',
    outputPath: path.resolve(appInfo.baseDir, './.guido-cache/dist'),
  };

  return config;
};
