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
    publicPath: 'https://remote-domian/asset/root/path',
    outputPath: path.resolve(appInfo.baseDir, './app/public/dist-sit'),
  };

  return config;
};
