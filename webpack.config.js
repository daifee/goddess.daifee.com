
'use strict';

const childProcess = require('child_process');
const assert = require('assert');
const webpack = require('guido').webpack;
const AssetsPlugin = require('assets-webpack-plugin');
const loadAppConfig = require('./scripts/loadAppConfig');
const readWebpackEntry = require('./scripts/readWebpackEntry');

/**
 * EGG_SERVER_ENV环境变量
 */
const EGG_SERVER_ENV = process.env.EGG_SERVER_ENV;
assert([ 'local', 'sit', 'prod' ].indexOf(EGG_SERVER_ENV) !== -1, '环境变量不合法：EGG_SERVER_ENV');


/**
 * Egg APP 配置
 */
const appConfig = loadAppConfig(EGG_SERVER_ENV);

/**
 * 清空outputPath旧内容
 */
childProcess.execSync(`rm -rf ${appConfig.assets.outputPath}`);


module.exports = {
  context: appConfig.assets.path,
  entry: readWebpackEntry(appConfig),

  output: {
    path: appConfig.assets.outputPath,
    publicPath: appConfig.assets.publicPath,
  },

  plugins: [
    // 生成 assets.json 插件
    new AssetsPlugin({
      filename: 'assets.json',
      prettyPrint: true,
      useCompilerPath: true,
      metadata: {
        'build-time': Date.now(),
      },
    }),
    // common chunks
    // 自己根据实际情况配置优化策略
    new webpack.optimize.CommonsChunkPlugin({
      // 名字默认是`common`，如果修改名字`app/extend/helper.js`需要对应修改
      name: 'common',
      minChunks: 2,
    }),
  ],
};

