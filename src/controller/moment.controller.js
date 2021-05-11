const momentService = require('../service/moment.service');

class MomentController {
  async create(ctx, next) {
    //1.获取数据(user_id,content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    //2.将数据插入数据库
    const result = await momentService.create(userId, content);

    ctx.body = result;
  };

  async detail(ctx, next) {
    //1.获取momentId
    const momentId = ctx.params.momentId;

    //2根据momentId查询数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;

  };

  async list(ctx, next) {
    //1.获取查询参数
    const {offset, size} = ctx.query;

    //2.查询数据库
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;

  };

  async update(ctx, next) {
    const {momentId} = ctx.params;
    const {content} = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  };

  async remove(ctx, next) {
    //1获取momentId
    const {momentId} = ctx.params;

    //2删除内容
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }
}

module.exports = new MomentController();
