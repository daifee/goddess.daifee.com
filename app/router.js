'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  require('./router/v1')(app);
  require('./router/admin')(app);

  // 首页
  router.get('/', controller.home.index);

  // 登录页
  router.get('/login', controller.user.login);
  // 用户列表页
  router.get('/users/', controller.user.list);
  // 用户主页
  router.get('/users/:name', controller.user.profile);
  // 编辑用户资料
  router.get('/users/:name/edit', controller.user.edit);
};
