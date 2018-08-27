/**
 * 默认配置。指定环境配置会覆盖本配置
 * 配置策略：默认是`prod`环境配置，其他环境根据需要覆盖
 */
'use strict';

require('../scripts/loadEnv');

const path = require('path');
const errorCodes = require('./error-codes');


module.exports = appInfo => {
  const config = exports = {};
  const {
    PORT,
    AUTHORIZATION_SECRET,
    COOKIE_KEYS,

    MONGO_URL,
    MONGO_USER,
    MONGO_PASSWORD,

    TENCENT_COS_SECRET_ID,
    TENCENT_COS_SECRET_KEY,

    ASSETS_OUTPUT_DIRNAME,
    ASSETS_PUBLIC_PATH,
  } = process.env;


  config.cluster = {
    listen: {
      port: Number(PORT),
    },
  };

  /**
   * 安全相关
   */
  // 秘密
  config.secret = AUTHORIZATION_SECRET;
  // use for cookie sign key, should change to your own and keep security
  config.keys = COOKIE_KEYS;
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
    outputPath: path.resolve(appInfo.baseDir, './app/public', ASSETS_OUTPUT_DIRNAME),
    publicPath: ASSETS_PUBLIC_PATH,
  };

  /**
   * 腾讯云 COS
   */
  config.tencentCos = {
    url: 'https://sts.api.qcloud.com/v2/index.php',
    domain: 'sts.api.qcloud.com',
    proxy: '',
    secretId: TENCENT_COS_SECRET_ID, // 固定密钥
    secretKey: TENCENT_COS_SECRET_KEY, // 固定密钥
    bucket: 'goddess-1257388993',
    region: 'ap-chengdu',
    // 这里改成允许的路径前缀，这里可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 a/* 或者 a.jpg
    allowPrefix: '*',
  };


  return config;
};

