'use strict';

const VALID_ENV = [ 'prod', 'sit', 'unittest', 'local' ];
const path = require('path');
const assert = require('assert');
const fs = require('fs');

assert(VALID_ENV.indexOf(process.env.EGG_SERVER_ENV) !== -1, '必须在执行启动指令前定义正确的环境变量EGG_SERVER_ENV');

// 加载环境变量
const envPath = path.resolve(process.cwd(), `.${process.env.EGG_SERVER_ENV}.env`);

assert(fs.existsSync(envPath), `不存在 ${envPath} 文件`);

require('dotenv').config({
  path: envPath,
});
