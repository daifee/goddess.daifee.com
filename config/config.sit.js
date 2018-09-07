/**
 * 线上测试环境的配置
 */

'use strict';
const path = require('path');


module.exports = appInfo => {
  const config = exports = {};

  /**
   * assets
   */
  config.assets = {
    outputPath: path.resolve(appInfo.baseDir, './app/public', 'dist-sit'),
    publicPath: 'http://127.0.0.1:6080/public/dist-sit',
  };

  return config;
};
