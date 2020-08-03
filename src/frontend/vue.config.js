const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("/src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("/src/components"))
      .set("network", resolve("src/network"))
      .set("views", resolve("src/views"))
      .set("img", resolve("src/assets/img"))
      .set("common",resolve("/src/common"));
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};

// cli4里面该配置方法已失效
// module.exports = {
//    configureWebpack: {
//       resolve: {
//          alias: {
//             'assets': '@/assets',
//             'common': '@/common',
//             'components': '@/components',
//             'network': '@/network',
//             'views': '@/views',
//          }
//       }
//    }
// }
