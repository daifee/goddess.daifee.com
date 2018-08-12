'use strict';


module.exports = function(app) {
  // 加载 assets.json
  app.beforeStart(async () => {
    // 如果CDN防盗链，可能请求不了
    const url = `${app.config.assets.publicPath}/assets.json`;
    try {
      const response = await app.curl(url, {
        method: 'GET',
        dataType: 'json',
      });

      if (response.data) {
        Object.assign(app.locals, {
          assetsMap: response.data,
        });
      } else {
        throw new Error('assetsMap缺失数据');
      }
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
