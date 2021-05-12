const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const authService = require('../service/auth.service');
const md5password = require('../utils/password-handle');
const jwt = require('jsonwebtoken');
const {PUBLIC_KEY,PRIVATE_KEY} = require('../app/config')

const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;

  //2.判断用户名和密码是否为空
  if(!name || !password){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  //3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  if(!user){
    const error = new Error(errorTypes.USER_DOSE_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  //4.判断密码是否正确
  if(md5password(password) !== user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  //1.获取token
  const authorization = ctx.headers.authorization;
  if(!authorization){
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return  ctx.app.emit('error', error, ctx );
  }
  const token = authorization.replace('Bearer ', '');
  // const token = authorization.split(' ')[1];
  //2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  }catch (e) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx );
  }


};

const verifyPermisson = (tableName) => {
  return async (ctx, next) => {
    //1.获取参数
    // const {commentId} = ctx.params;
    // { commentId: '1' }
    const [key] = Object.keys(ctx.params)
    const keyValue = ctx.params[key];
    console.log(ctx.params,'++++')
    const {id} = ctx.user;

    //2查询是否具备权限
    try {
      const isPerission = await authService.checkResource(tableName , keyValue, id);
      if(!isPerission){
        const error = new Error(errorTypes.UNPERMISSON);
        return ctx.app.emit('error', error, ctx);
      }
      await next();
    } catch (e) {
      const error = new Error(errorTypes.UNPERMISSON);
      return ctx.app.emit('error', error, ctx);
    }

  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermisson
};
