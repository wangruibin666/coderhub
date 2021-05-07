const fs = require('fs');

const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js')return;
    const router = require(`./${file}`);
    this.use(router.routes());  //this就是首页app/index中的app对象,this的隐式绑定
    this.use(router.allowedMethods())
  })
};

module.exports = useRoutes;
