const path = require("path");
const glob = require("glob"); // 文件匹配
const { sep } = path;
/**
 * 中间件
 * @Params {object} app Koa2 实例
 * 加载所有的 middleware 可通过 `app.middleware.${目录}.${文件}` 访问
 * 例子 app/middleware/common/aaa-middleware.js
 * app.middleware.common.aaaMiddleware就可以访问到
 * */
module.exports = (app) => {
  // 1. 读取 app/middleware/**/*.js */ 目录下的所有文件
  const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`); // 获取目录
  const fileList = glob.sync(path.resolve(middlewarePath, `**${sep}**.js`)); // 便利对应目录下的获取所有文件
  // 2. 便利所有目录,把内容加载到 app.middleware 下
  const middlewares = {};
  fileList.forEach((file) => {
    // 提取文件名称
    let name = path.resolve(file);
    // 截取路径
    name = name.substring(
      name.lastIndexOf(`middlware${sep}`) + `middlewares${sep}`.length,
      name.lastIndexOf(".js"), // 去掉后缀
    );
    // 把文件名称中的 - 替换成 驼峰(aa-middleware -> aaMiddleware)
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    // 挂载middleware到app上
    let tempMiddleware = middlewares;
    const names = name.split(sep); // 分割文件名称
    for (let i = 0; i < names.length; i++) {
      if (i === names.length - 1) {
        // 说明是文件了
        tempMiddleware[names[i]] = require(path.resolve(file))(app);
      } else {
        // 说明是目录
        if (!tempMiddleware[names[i]]) {
          tempMiddleware[names[i]] = {};
        }
        tempMiddleware = tempMiddleware[names[i]];
      }
    }
  });

  // 然后把 middlewares 挂载到 app.middlewares 上
  app.middlewares = middlewares;
};
