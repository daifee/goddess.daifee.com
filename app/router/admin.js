'use strict';

async function todo() {
  this.ctx.body = { msg: 'TODO' };
}

module.exports = app => {
  const { router, middleware, controller } = app;
  const { authorize } = middleware;

  /**
   * 标签
   */
  // 列表
  router.get('/api/admin/labels/', authorize.admin, controller.label.list);
  // 创建
  router.post('/api/admin/labels/', todo);
  // 更新
  router.put('/api/admin/labels/:id', todo);
  // 删除
  router.delete('/api/admin/labels/:id', todo);

  /**
   * 图片
   */
  router.get('/api/pictures/', todo);
  router.put('/api/pictures/:id', todo);

};
