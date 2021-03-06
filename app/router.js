'use strict';

// function noop() {
//   // todo
// }

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { home, like, user, microBlog } = controller;
  router.get('/wetest-a3522a1756f1d80968709444bc64f396.txt', home.wetest);

  require('./router/v1')(app);
  require('./router/admin')(app);

  // 关于
  router.get('/about', home.about);

  router.get('/test', home.test);

  // 登录页
  router.get('/login', home.login);
  // 注册页
  router.get('/register', home.register);
  router.get('/logout', home.logout);
  // 用户主页
  router.get('/users/:id', user.profile);
  // 收藏列表
  router.get('/users/:id/likes/', like.list);
  // 专题页
  router.get('/recommended/', microBlog.recommended);
  // 首页
  router.redirect('/', '/recommended/', 302);
};
