'use strict';
const Service = require('../core/base-service');


class MicroBlogService extends Service {
  // 新建微博
  async create(doc) {
    const { MicroBlog } = this.ctx.model;
    const { picture } = this.ctx.service;
    let result;

    if (doc.videoUrl) {
      doc.type = 'video';
    }

    await picture.createMultiple(doc.userId, doc.pictureUrls);
    try {
      result = await MicroBlog.create(doc);
    } catch (error) {
      this.handleMongooseError(error);
    }
    return result;
  }

  // 更新微博
  async update(id, obj) {
    let result;
    // 不能修改这个
    obj.type = undefined;

    const { MicroBlog } = this.ctx.model;
    const query = MicroBlog.find({})
      .findOneAndUpdate({ _id: id }, obj, { new: true });

    try {
      result = await query.exec();
    } catch (error) {
      if (error.code === 11000) {
        this.ctx.throw(400, '重复发布', { error });
      } else if (error.name === 'ValidationError') {
        this.ctx.throw(400, error.message, { error });
      } else {
        this.ctx.throw(503, error.message, { error });
      }
    }

    return result;
  }

  // 删除微博
  async delete(id) {
    const { MicroBlog } = this.ctx.model;
    const query = MicroBlog.find({})
      .update({ _id: id }, { status: 'deleted' });

    const result = await query.exec();
    return !!result.ok;
  }

  // 查找微博（一条）
  async findById(id) {
    const { MicroBlog } = this.ctx.model;
    const query = MicroBlog.find({})
      .findOne({ _id: id, status: { $ne: 'deleted' } });
    return await query.exec();
  }

  // 查找微博（全部，分页）
  async find(page = 1, perPage = 10) {
    const query = this.ctx.model.MicroBlog.find({})
      .find({ status: { $ne: 'deleted' } })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return await query.exec();
  }

  // 查找微博（用户，分页）
  async findByUserId(userId, page = 1, perPage = 10) {
    const query = this.ctx.model.MicroBlog.find({})
      .find({ userId, status: { $ne: 'deleted' } })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return await query.exec();
  }

  // 查找微博（全部已删除，分页）
  async findDeleted(page = 1, perPage = 10) {
    const query = this.ctx.model.MicroBlog.find({})
      .find({ status: 'deleted' })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return await query.exec();
  }

  // 查找微博（用户已删除，分页）
  async findDeletedByUserId(userId, page = 1, perPage = 10) {
    const query = this.ctx.model.MicroBlog.find({})
      .find({ status: 'deleted', userId })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return await query.exec();
  }

  // 查找微博（根据推荐专题，只返回2条，根据推荐时间排序）
  async findRecommended(recommended = 'goddess') {
    const queryBlogs = this.ctx.model.MicroBlog.find({})
      .find({ status: { $ne: 'deleted' }, recommended })
      .sort({ recommendedTime: -1 })
      .limit(2);
    const blogs = await queryBlogs.exec();

    const userIds = blogs.map(item => {
      return item.userId;
    });

    const queryUsers = this.ctx.model.User.find({ _id: { $in: userIds } });
    const users = await queryUsers.exec();

    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });

    blogs.forEach(blog => {
      blog.user = userMap[blog.userId];
    });

    return blogs;
  }

  // 推荐
  async recommend(id, recommended) {
    return await this.update(id, {
      recommended,
      recommendedTime: new Date(),
    });
  }

  // 刷新推荐时间
  async freshRecommendedTime(id) {
    return await this.update(id, {
      recommendedTime: new Date(),
    });
  }
}

module.exports = MicroBlogService;
