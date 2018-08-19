/**
 * 默认配置。指定环境配置会覆盖本配置
 */
'use strict';

const path = require('path');
const errorCodes = require('./error-codes');

module.exports = appInfo => {
  const config = exports = {};

  exports.security = {
    csrf: {
      enable: false,
    },
  };

  /**
   * 自定义API错误码
   */
  config.errorCodes = errorCodes;

  /**
   * 配置异常处理器
   */
  config.onerror = {
    json(err, ctx) {
      ctx.status = 200;
      ctx.body = {
        code: err.code,
        message: err.message,
      };
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533867498821_8761';

  // add your config here
  config.middleware = [ 'notFound' ];

  /**
   * 配置模板引擎（handlebars）
   */
  config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.hbs',
  };
  config.handlebars = {
    knownHelpersOnly: false,
  };

  /**
   * 配置assets
   */
  config.assets = {
    path: path.resolve(appInfo.baseDir, './app/assets'),
  };

  return config;
};
