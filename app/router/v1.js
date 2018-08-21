'use strict';

async function todo() {
  this.ctx.body = { msg: 'TODO' };
}

module.exports = app => {
  const { router, controller, middleware } = app;
  const { authorize } = middleware;

  /**
   * 用户：
   * * 注册
   * * 授权
   */
  router.post('/api/v1/users/', controller.user.post);
  router.post('/api/v1/authorization', controller.user.authorize);

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
  router.post('/api/v1/users/:userId/micro-blogs/', todo);
  // 修改微博
  router.put('/api/v1/users/:userId/micro-blogs/:blogId', todo);
  // 删除微博
  router.delete('/api/v1/users/:userId/micro-blogs/:blogId', todo);
  /**
   * 收藏
   */
  // 收藏列表
  router.get('/api/v1/users/:userId/likes/', todo);
  // 添加收藏
  router.post('/api/v1/users/:userId/likes/', todo);
  // 取消收藏
  router.delete('/api/v1/users/:userId/likes/:likeId', todo);

  /**
   * 获取微博：运营主题（goddess, landscand, self），最多显示2条
   */
  router.get('/api/v1/micro-blogs/', todo);
};
