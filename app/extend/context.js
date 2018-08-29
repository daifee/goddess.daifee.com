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

};

