'use strict';
/**
 * 加载Egg配置
 * 为了在webpack中使用Egg配置
 */

const path = require('path');
const extend = require('extend2');

const baseDir = path.resolve(__dirname, '../');
const pkg = require(path.resolve(baseDir, './package.json'));
// config回调需要传递 appInfo对象
const mockAppInfo = {
  baseDir,
  pkg,
  name: pkg.name,
};

/**
 * 加载 Egg APP 配置
 * @param {string} eggServerEnv Egg环境变量
 * @return {object} Egg APP 配置
 */
module.exports = function(eggServerEnv) {
  const defaultConfigPath = path.resolve(baseDir, './config/config.default');
  let defaultConfig = require(defaultConfigPath);
  if (typeof defaultConfig === 'function') {
    defaultConfig = defaultConfig(mockAppInfo);
  }

  const envConfigPath = path.resolve(baseDir, `./config/config.${eggServerEnv}`);
  let envConfig = require(envConfigPath);
  if (typeof envConfig === 'function') {
    envConfig = envConfig(mockAppInfo);
  }

  return extend(true, {}, defaultConfig, envConfig);
};
