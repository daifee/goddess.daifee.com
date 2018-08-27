'use strict';

// function noop() {
//   // todo
// }

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, middleware, controller } = app;
  const { authorizeCookie } = middleware;
  const { home, like, user, microBlog } = controller;
  require('./router/v1')(app);
  require('./router/admin')(app);

  // 登录页
  router.get('/login', home.login);
  // 注册页
  router.get('/register', home.register);
  router.get('/logout', home.logout);
  // 用户主页
  router.get('/users/:id', authorizeCookie.user, user.profile);
  // 收藏列表
  router.get('/users/:id/likes/', authorizeCookie.user, like.list);
  // 专题页
  router.get('/recommended/', microBlog.recommended);
  // 首页
  router.redirect('/', '/recommended/', 302);
};
