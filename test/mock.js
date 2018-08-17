'use strict';

exports.int = function(min = 0, max = 999999) {
  const range = max - min;
  const result = range * Math.random() + min;

  return Math.floor(result);
};

exports.string = function(len = 9, seed = '发窘啊876发达奇偶') {
  const result = [];
  let index;
  while (result.length < len) {
    index = exports.int(0, seed.length);
    result.push(seed[index]);
  }

  return result.join('');
};


exports.user = function(user = {}) {
  return Object.assign({
    name: exports.string(),
    password: exports.string(7, 'fjaio*7f^&fda324'),
    phone: exports.string(11, '123456789'),
  }, user);
};

exports.label = function(label = {}) {
  return Object.assign({
    name: exports.string(6),
    description: exports.string(32),
  }, label);
};

exports.picture = function(picture = {}) {
  return Object.assign({
    url: exports.string(12),
  }, picture);
};
