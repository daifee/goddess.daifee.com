/**
 * 默认配置。指定环境配置会覆盖本配置
 * 配置策略：默认是`prod`环境配置，其他环境根据需要覆盖
 */
'use strict';

const path = require('path');
const errorCodes = require('./error-codes');


module.exports = appInfo => {
  const config = exports = {};
  const {
    PORT,
    SECRET,
    KEYS,
    MONGO_URL,
    MONGO_USER,
    MONGO_PASSWORD,
  } = process.env;

  config.cluster = {
    listen: {
      port: PORT,
    },
  };

  /**
   * 安全相关
   */
  // 机密，用于生成 authorization token
  config.secret = SECRET;
  // use for cookie sign key, should change to your own and keep security
  config.keys = KEYS;
  // 关掉csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    url: MONGO_URL,
    options: {
      useNewUrlParser: true,
      auth: {
        user: MONGO_USER,
        password: MONGO_PASSWORD,
      },
    },
  };

  // 全局中间件
  config.middleware = [ 'notFound', 'pagination' ];

  /**
   * 配置异常处理器
   */
  // 自定义API错误码
  config.errorCodes = errorCodes;
  // 异常处理器
  config.onerror = {
    // 不支持异步
    html(err, ctx) {
      ctx.renderError(err);
    },
    json(err, ctx) {
      ctx.status = 200;
      ctx.body = {
        code: err.code,
        message: err.message,
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
    outputPath: path.resolve(appInfo.baseDir, './app/public/dist-prod'),
    publicPath: `http://127.0.0.1:${PORT}`,
  };

  return config;
};

