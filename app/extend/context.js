'use strict';

const fs = require('fs');
const createError = require('http-errors');
const path = require('path');
const handlebars = require('handlebars');

let compiledErrorTemplate;
const DEFAULT_ERROR_TEMPLATE = `
  <h1>Error: {{code}}</h1>
  <p>对不起，出错了！</p>
`;

module.exports = {
  /**
   * 渲染错误页面，并设置`ctx.body`
   *
   * @param {Error} err 错误对象
   * @param {object} options handlebars `options` 参数
   */
  renderError(err, options = {}) {
    const app = this.app;

    if (!compiledErrorTemplate) {
      let errorTemplate = DEFAULT_ERROR_TEMPLATE;

      try {
        const file = path.resolve(app.view.config.root[0], 'error.hbs');
        errorTemplate = fs.readFileSync(file, 'utf8');
      } catch (err) {
        app.logger.error(err.message);
      }

      options = Object.assign({}, app.config.handlebars, options);
      compiledErrorTemplate = handlebars.compile(errorTemplate, options);
    }

    this.status = 500;
    this.body = compiledErrorTemplate({ code: err.code });
  },

  // 定义 API 输出 JSON 接口
  echo(data) {
    this.body = {
      code: 0, // 0表示成功
      message: 'success',
      data,
    };
  },

  /**
   * 自定义错误响应规范
   * 重写Koa的`ctx.throw(status, message, properties)`接口
   *
   * @param {number} [code=1000] config/error-codes.json定义的`code`
   * @param {string} [message=''] 错误信息
   * @param {object} [properties={}] 自扩展参数
   */
  throw(code = 99999, message = '', properties = {}) {
    const app = this.app;
    const errorCodes = app.config.errorCodes;
    let status;

    if (code < 10000) {
      // egg框架异常
      status = code;
    } else if (code >= 10000 && code < 20000) {
      // controller异常
      status = 400;
    } else {
      status = 500;
    }

    if (!message) {
      if (errorCodes[code]) {
        message = errorCodes[code];
      } else {
        message = '缺失错误信息';
      }
    }

    throw createError(status, message, Object.assign({ code }, properties));
  },
};

