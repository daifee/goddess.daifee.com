# goddess.daifee.com

Demo项目

- [goddess.daifee.com](#goddessdaifeecom)
  - [快速入门](#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
    - [本地开发](#%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91)
    - [运行环境](#%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83)
    - [新增指令](#%E6%96%B0%E5%A2%9E%E6%8C%87%E4%BB%A4)
    - [约定`app/assets/`目录](#%E7%BA%A6%E5%AE%9Aappassets%E7%9B%AE%E5%BD%95)
    - [更多](#%E6%9B%B4%E5%A4%9A)

## 快速入门

> 先看一遍[Egg文档](https://eggjs.org/zh-cn/intro/)

为了更完善的“开箱即用”，集成Egg和[Guido](https://github.com/zuzucheFE/guido/)，定义`app/assets/`目录开发 JS/CSS，实现更简便的本地开发模式，新增一些基本功能和配置。


### 本地开发

本地开发需要启动2个服务：

1. Guido: 构建静态资源，并提供静态资源服务（webpack-dev-server）
2. Egg: 渲染页面，是一个“完整”的web-server（koa）

```bash
$ npm install
$ npm run dev-assets
$ npm run dev
$ open http://localhost:7001/
```

**本地开发时序图：**

![本地开发时序图](./docs/Egg&Guido本地开发原理.jpg)


### 运行环境

- local 本地开发环境
- sit 线上测试环境
- prod 生产环境
- test 单元测试环境


### 新增指令

- `npm run dev-assets` 启动Guido本地开发服务
- `npm run build-assets-prod` 构建“生产环境”的静态资源包
- `npm run build-assets-sit` 构建“线上测试环境”的静态资源包
- `npm run build-assets` 不需要用


### 约定`app/assets/`目录

静态资源的源码放在`app/assets/`目录。

根据**webpack**的特性，我们**约定**为每个页面定义一个“静态资源”入口，所以约定了**页面目录结构**：`app/assets/page/$pageName/index.js`。

- `app/assets/page/$pageName/index.js` 每个页面必有，且唯一的“静态资源入口”。
- `$pageName` 开发者定义的页面名称。
- `index.js` `webpackage`配置的入口文件

> 约定的`$pageName`很重要，`controller`渲染模板需要用到。


### 更多

- 集成Handlebars
- `./webpack.config.js`可以读取`./config`配置信息
- 自定义404响应
- 自定义“错误”响应
- 重写`ctx.throw()`方法
- 在`./config/error-codes.js`定义所有“错误码”
- 定义React渲染页面的模板（`./app/view/react.hbs`）
- 定义`BaseController`(`./app/core/base-controller.js`)
- 中间件处理权限验证
- 中间件转“通用参数”数据类型
