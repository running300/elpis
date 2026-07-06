const path = require("path"); // 路径处理
const glob = require("glob"); // 文件匹配
const { sep } = path;
/**
 * 路由规则
 * @param {object} app koa2 app实例
 * 通过 json-schema(包) & ajv 校验路由参数
 */
module.exports = (app) => {
  // 1. 读取 app/router-schema/**/**.js */ 目录下的所有文件
  const routerSchemaPath = path.resolve(
    app.businessPath,
    `.${sep}router-schema`,
  ); // 获取目录
  const fileList = glob.sync(path.resolve(routerSchemaPath, `**${sep}**.js`)); // 获取文件列表

  // 注册所有 routerSchema，使得可以'app.routerSchema'在路由中使用
  let routerSchema = {};
  fileList.forEach((file) => {
    routerSchema = {
      ...routerSchema,
      ...require(path.resolve(file)),
    };
  });
  app.routerSchema = routerSchema;
};
