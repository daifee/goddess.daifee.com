'use strict';

const path = require('path');

module.exports = function(app) {
  // 加载 assets.json
  app.beforeStart(async () => {

    try {
      let assetsMap;
      const fileName = 'assets.json';
      const config = app.config;

      if (app.config.env === 'local') {
        const url = `${config.assets.publicPath}/${fileName}`;
        const response = await app.curl(url, {
          method: 'GET',
          dataType: 'json',
        });
        assetsMap = response.data;
      } else {
        const file = path.resolve(config.assets.outputPath, fileName);
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
