'use strict';

async function noop() {
  return null;
}

module.exports = app => {
  const { router } = app;

  router.get('/api/', noop);

  /**
   * 用户
   * * 详情
   * * 登录
   */

  /**
   * 标签
   * * 标签列表
   * * 创建标签
   * * 更新标签
   * * 删除标签
   */

  /**
   * 用户收藏
   * * 收藏列表
   * * 取消收藏
   * * 添加收藏
   */

  /**
   * 微博
   * * 发布微博
   * * 删除微博
   * * 获取两条微博?subject=goddess
   */

  /**
   * 图片
   * * 图片列表
   * * 添加标签
   * * 取消标签
   */
};
