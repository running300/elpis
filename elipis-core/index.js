const Koa = require("koa");
const env = require("./env");
const path = require("path");
const { sep } = path; // 兼容不同操作系统的路径分隔符(windows是\，mac是/)

const {
  middlewareLoader,
  routerSchemaLoader,
  routerLoader,
  controllerLoader,
  serviceLoader,
  configLoader,
  extendLoader,
} = require("./loader");

// 各个loader注册
const regiterLoader = (app) => {
  middlewareLoader(app);
  routerSchemaLoader(app); // 路由schema
  routerLoader(app); // 路由
  controllerLoader(app); // 控制器
  serviceLoader(app); // 服务
  configLoader(app); // 配置
  extendLoader(app); // 扩展
};

module.exports = {
  /**
   * 启动项目
   * @Params options 项目配置
   */
  start(options = {}) {
    try {
      const app = new Koa();
      // 1. 把配置项挂载到app上
      app.options = options;
      // 2. 记录路径
      app.baseDir = process.cwd(); // 项目的根目录
      app.businessPath = path.resolve(app.baseDir, `.${sep}app`); //业务路径

      // 3. 环境变量配置(环境识别器)
      app.env = env(); // 环境变量配置挂载到app上
      console.log(app.env.get());

      // 4. 注册loader
      regiterLoader(app);

      const port = process.env.PORT || 3000;
      const host = process.env.HOST || "0.0.0.0";
      app.listen(port, host, () => {
        console.log(`Server listening on ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
