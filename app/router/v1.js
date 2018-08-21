'use strict';

async function todo() {
  this.ctx.body = { msg: 'TODO' };
}

module.exports = app => {
  const { router, controller, middleware } = app;
  const { authorize } = middleware;
  const { user } = controller.v1;

  /**
   * 用户：
   * * 注册
   * * 授权
   */
  router.post('/api/v1/users/', user.post);
  router.post('/api/v1/authorization', user.authorize);

  /**
   * 用户内容：
   * * 微博
   * * 收藏
   */
  /**
   * 微博
   */
  // 微博列表
  router.get('/api/v1/users/:userId/micro-blogs/', authorize.user, todo);
  // 发布微博
  router.post('/api/v1/users/:userId/micro-blogs/', authorize.user, todo);
  // 修改微博
  router.put('/api/v1/users/:userId/micro-blogs/:blogId', authorize.user, todo);
  // 删除微博
  router.delete('/api/v1/users/:userId/micro-blogs/:blogId', authorize.user, todo);
  /**
   * 收藏
   */
  // 收藏列表
  router.get('/api/v1/users/:userId/likes/', authorize.user, todo);
  // 添加收藏
  router.post('/api/v1/users/:userId/likes/', authorize.user, todo);
  // 取消收藏
  router.delete('/api/v1/users/:userId/likes/:likeId', authorize.user, todo);

  /**
   * 获取微博：运营主题（goddess, landscape, self），最多显示2条
   */
  router.get('/api/v1/micro-blogs/', todo);
};
