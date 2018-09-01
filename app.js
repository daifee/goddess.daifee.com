'use strict';

const path = require('path');


module.exports = function(app) {
  // 加载 assets.json
  app.beforeStart(async () => {

    try {
      let assetsMap;
      const config = app.config;

      if (app.config.env === 'unittest' || app.config.env === 'local') {
        assetsMap = {};
      } else {
        const file = path.resolve(config.assets.outputPath, config.assets.assetsMapFileName);
        assetsMap = require(file);
      }

      if (!assetsMap) {
        throw new Error('assetsMap缺失数据');
      }

      Object.assign(app.locals, {
        assetsMap,
      });
    } catch (err) {
      app.coreLogger.error('加载assets.json错误：' + err.message);
      // 需要延时，等待写入日志，不然无法正常写错误日志。
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(err);
        }, 5000); // 给5秒写错误日志，再终止启动
      });
    }
  });

};
