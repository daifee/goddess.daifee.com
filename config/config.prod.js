/**
 * 生产环境的配置
 */


'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

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
  };

  return config;
};
