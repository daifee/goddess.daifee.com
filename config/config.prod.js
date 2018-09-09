/**
 * 生产环境的配置
 */
'use strict';
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const md5 = require('../app/util/md5');


module.exports = appInfo => {
  const config = exports = {};

  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '75760',
    secret: '21937ba41784a54dfbfab096c00b03a5d7c02e13',
  };

  // 异常处理器
  const errorTplFile = './app/view/error.hbs';
  const errorTpl = fs.readFileSync(path.resolve(appInfo.baseDir, errorTplFile), 'utf8');
  const compiledErrorTpl = handlebars.compile(errorTpl);
  config.onerror = {
    // 不支持异步
    html(error, ctx) {
      error.stackId = md5(error.stack);
      ctx.status = error.status || 500;
      ctx.body = compiledErrorTpl({ error });
    },

    json(error, ctx) {
      error.stackId = md5(error.stack);
      ctx.status = 200;
      ctx.body = {
        code: error.status,
        message: error.message,
        stackId: error.stackId,
      };
    },
  };

  return config;
};

