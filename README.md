# goddess.daifee.com

基于Egg的一个Demo项目。

## 目标

本项目提供API服务，然后基于API服务实现多个版本客户端：

1. [x] [API服务](https://github.com/daifee/goddess.daifee.com)
2. [x] [传统网站（PC）](https://github.com/daifee/goddess.daifee.com)
3. [x] [单页应用（Mobile, React）](https://github.com/daifee/goddess-spa.daifee.com)
4. [ ] 同构应用（Mobile, React）
5. [ ] 微信小程序
6. [ ] Android应用
7. [ ] iOS应用
8. [ ] Windows桌面应用（Electron）
9. [ ] Mac桌面应用（Electron）

## 本地开发

1. 安装系统依赖：
    1. Node.js(>=v8.0.0)
    2. MongoDB(>=3.0.0)
2. 启动MongoDB：`sudo mongod --dbpath ~/data/db/mongo/ --logpath ~/data/log/mongo.log`
3. 创建MongoDB帐号，并配置`./config`
4. 启动服务`npm run dev`
5. 浏览器访问


## 单元测试

> 只支持本地跑测试

`npm run test-local`


## 测试覆盖报告

`npm run cov`


## 发布


**发布服务器：**

1. 本地虚拟机安装Ubuntu作为“发布服务器”
2. 发布服务器已上传密钥到生产服务器
3. 发布服务器部署好“发布脚本”`./script/publish/main.sh`


**发布操作：**

1. 为准备发布的版本打标签（`git tag vx.x.x`）
2. 推送标签到远程仓库
3. 登录“发布服务器”
4. 执行“发布脚本”，根据提示选择版本（标签）

> 发布脚本包含功能：重启程序、回滚指定版本、发布指定版本
