'use strict';

const createError = require('http-errors');

module.exports = {
  setCookieUser(token) {
    this.cookies.set('Authorization', token, { signed: false });
  },

  getCookieUser() {
    const { User } = this.model;
    const token = this.cookies.get('Authorization', { signed: false });
    try {
      const tokenObj = User.jwtVerify(token);
      return tokenObj.user;
    } catch (error) {
      return null;
    }
  },

  removeCookieUser() {
    this.cookies.set('Authorization', '', { signed: false, maxAge: -1 });
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

