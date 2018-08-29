/**
 * 单元测试环境的配置
 */

'use strict';

module.exports = () => {
  const config = exports = {};


  // 单元测试就不需要在终端打印日志
  config.logger = {
    consoleLevel: 'NONE',
  };

  return config;
};
