'use strict';
/**
 * 读取webpack入口配置`app/assets/page/${entryName}/index.js`
 */
const path = require('path');
const fs = require('fs');

module.exports = function(appConfig) {
  const pageDir = path.resolve(appConfig.assets.path, 'page');
  const entryNames = fs.readdirSync(pageDir);
  const entry = {};
  entryNames.forEach(name => {
    const entryFile = path.resolve(pageDir, name, 'index.js');
    // 检测文件是否存在
    if (fs.existsSync(entryFile)) {
      entry[name] = entryFile;
    }
  });

  return entry;
};

