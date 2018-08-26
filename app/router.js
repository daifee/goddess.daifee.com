'use strict';

// function noop() {
//   // todo
// }

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, middleware, controller } = app;
  const { authorize } = middleware;
  const { home, like, user, microBlog } = controller;
  require('./router/v1')(app);
  require('./router/admin')(app);

  // 登录页
  router.get('/login', home.login);
  // 注册页
  router.get('/register', home.register);
  // 用户主页
  router.get('/users/:id', user.profile);
  // 收藏列表
  router.get('/users/:id/likes/', like.list);
  // 专题页
  router.get('/recommended/', microBlog.recommended);

};
