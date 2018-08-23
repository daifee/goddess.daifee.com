'use strict';


module.exports = app => {
  const { router, middleware, controller } = app;
  const { authorize } = middleware;
  const { label, picture } = controller.admin;

  /**
   * 标签
   * 为内容贴标签
   */
  // 列表
  router.get('/api/admin/labels/', authorize.admin, label.list);
  // 创建
  router.post('/api/admin/labels/', authorize.admin, label.create);
  // 更新
  router.put('/api/admin/labels/:id', authorize.admin, label.update);
  // 删除
  router.delete('/api/admin/labels/:id', authorize.admin, label.delete);

  /**
   * 图片
   * 对图片打标签
   */
  router.get('/api/admin/pictures/', authorize.admin, picture.list);
  router.put('/api/admin/pictures/:id', authorize.admin, picture.update);

};
