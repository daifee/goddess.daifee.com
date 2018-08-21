'use strict';

async function todo() {
  this.ctx.body = { msg: 'TODO' };
}

module.exports = app => {
  const { router, middleware, controller } = app;
  const { authorize } = middleware;
  const { label } = controller.admin;

  /**
   * 标签
   */
  // 列表
  router.get('/api/admin/labels/', authorize.admin, label.list);
  // 创建
  router.post('/api/admin/labels/', authorize.admin, todo);
  // 更新
  router.put('/api/admin/labels/:id', authorize.admin, todo);
  // 删除
  router.delete('/api/admin/labels/:id', authorize.admin, todo);

  /**
   * 图片
   */
  router.get('/api/pictures/', authorize.admin, todo);
  router.put('/api/pictures/:id', authorize.admin, todo);

};
