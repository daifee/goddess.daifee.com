# egg-demo

基于egg和guido的demo项目，定义/集成公司内部技术选型。

- [egg-demo](#egg-demo)
  - [快速入门](#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
    - [本地开发](#%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91)
    - [部署](#%E9%83%A8%E7%BD%B2)
    - [单元测试](#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)
    - [内置指令](#%E5%86%85%E7%BD%AE%E6%8C%87%E4%BB%A4)
  - [再次入门](#%E5%86%8D%E6%AC%A1%E5%85%A5%E9%97%A8)
    - [本地开发](#%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91)
    - [运行环境](#%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83)
    - [新增指令](#%E6%96%B0%E5%A2%9E%E6%8C%87%E4%BB%A4)
    - [约定`app/assets/`目录](#%E7%BA%A6%E5%AE%9Aappassets%E7%9B%AE%E5%BD%95)
    - [新增功能和配置](#%E6%96%B0%E5%A2%9E%E5%8A%9F%E8%83%BD%E5%92%8C%E9%85%8D%E7%BD%AE)

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org


## 再次入门

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

### 新增功能和配置

> “新增功能和配置”是Egg和Guido没有默认提供的

- 集成Handlebars，提供3个Demo页
- 定义`app/assets/`目录和入口文件结构
- 配置`./webpack.config.js`，并实现与`./config`耦合
  - `config.assets`: 新增的Egg配置选项
  - `assets.json`: webpack创建的文件（页面名与资源URL映射表）
- 集成Egg与Guido的本地开发功能
- 自定义404页面响应和API响应
- 自定义错误页面（500）
- 自定义错误响应规范（重写`this.ctx.throw()`方法）
- 定义API响应数据格式和接口 `controller.echo(data)`
- 定义渲染React页面的方式


