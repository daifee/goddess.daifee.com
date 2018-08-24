/**
 * 默认配置。指定环境配置会覆盖本配置
 */
'use strict';

const path = require('path');
const errorCodes = require('./error-codes');

module.exports = appInfo => {
  const config = exports = {};

  /**
   * 全局中间件
   */
  config.middleware = [ 'notFound', 'pagination' ];

  /**
   * 安全相关
   */
  // 机密，用于生成 authorization token
  config.secret = 'so easy';
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533867498821_8761';
  // 关掉csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  /**
   * 异常处理
   */
  // 自定义API错误码
  config.errorCodes = errorCodes;
  // 配置异常处理器
  config.onerror = {
    json(err, ctx) {
      ctx.status = 200;
      ctx.body = {
        code: err.code,
        message: err.message,
        // 生产环境应该关闭
        error: err,
      };
    },
  };

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
   * assets
   */
  config.assets = {
    path: path.resolve(appInfo.baseDir, './app/assets'),
    // publicPath
    // outputPath
  };

  return config;
};
