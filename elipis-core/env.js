// 1. 判断环境 本地/测试/生产
// 2. 根据环境读取不同的配置文件
module.exports = (app) => {
  return {
    // 判断是否时本地开发环境
    isLocal() {
      return process.env.NODE_ENV === "local";
    },
    // 判断是否是测试环境
    isBeta() {
      return process.env.NODE_ENV === "beta";
    },
    // 判断是否是生产环境
    isProduction() {
      return process.env.NODE_ENV === "production";
    },
    // 读取配置文件
    get() {
      return process.env.NODE_ENV ?? "local";
    },
  };
};
