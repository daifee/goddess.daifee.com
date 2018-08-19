'use strict';

/**
 * 过滤对象属性，返回新对象
 * @param {object} target 目标对象
 * @param {string} attrs 保留的属性
 * @return {object} 新对象
 */
exports.filter = function(target = {}, attrs = '') {
  attrs = attrs.split(/\s+/);
  const result = {};
  Object.keys(target).forEach(attr => {
    if (attrs.indexOf(attr) !== -1) {
      result[attr] = target[attr];
    }
  });

  return result;
};
