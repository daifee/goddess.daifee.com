'use strict';

const crypto = require('crypto');


module.exports = function(data, digest = 'hex') {
  return crypto.createHash('md5').update(data).digest(digest);
};
