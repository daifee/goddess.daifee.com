'use strict';

async function noop() {
  return null;
}

module.exports = app => {
  const { router } = app;

  router.get('/api/', noop);

  /**
   * 用户
   * * 注册
   * * 登录
   * * 详情
   */
  router.post('/api/users/', noop);
  router.get('/api/users/~', noop);
  router.post('/api/users/~', noop);

  /**
   * 用户收藏
   * * 收藏列表
   * * 取消收藏
   * * 添加收藏
   */
  router.get('/api/users/:userId/likes/', noop);
  router.post('/api/users/:userId/likes/', noop);
  router.delete('/api/users/:userId/likes/:likeId', noop);

  /**
   * 标签
   * * 标签列表
   * * 创建标签
   * * 更新标签
   * * 删除标签
   */
  router.get('/api/labels/', noop);
  router.post('/api/labels/', noop);
  router.put('/api/labels/:id', noop);
  router.delete('/api/labels/:id', noop);

  /**
   * 微博
   * * 发布微博
   * * 删除微博
   * * 获取两条微博?subject=goddess
   */
  router.post('/api/micro-blogs/', noop);
  router.delete('/api/micro-blogs/:id', noop);
  router.get('/api/micro-blogs/', noop);

  /**
   * 图片
   * * 图片列表
   * * 更新图片
   */
  router.get('/api/pictures/', noop);
  router.put('/api/pictures/:id', noop);

};
