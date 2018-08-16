'use strict';

async function todo() {
  this.ctx.body = { msg: 'TODO' };
}

module.exports = app => {
  const { router } = app;

  /**
   * 标签
   */
  // 列表
  router.get('/api/admin/labels/', todo);
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