const service = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    //获取用户请求传递的参数
    const user = ctx.request.body;
    // console.log('哈哈',user)
    //操作数据库
    const result = await service.create(user)

    //返回数据
    ctx.body = result
  }
}

module.exports = new UserController();
