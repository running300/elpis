const middlewareLoader = require("./middleware"); // 中间件
const routerSchemaLoader = require("./router-schema"); // 路由schema
const routerLoader = require("./router"); // 路由
const controllerLoader = require("./controller"); // 控制器
const serviceLoader = require("./service"); // 服务
const configLoader = require("./config"); // 配置
const extendLoader = require("./extend"); // 扩展

module.exports = {
  middlewareLoader,
  routerSchemaLoader,
  routerLoader,
  controllerLoader,
  serviceLoader,
  configLoader,
  extendLoader,
};
