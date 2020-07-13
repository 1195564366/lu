
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
module.exports = {

  publicPath: '/',

  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项

  devServer: {
      port: 8080, // 端口号
      // host: 'localhost',
      https: false, // https:{type:Boolean}
      disableHostCheck: true,
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
      proxy: {
          '/jcwecaht': {
              target: 'https://gaokexinda.com',
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                '^/jcwecaht': '/jcwecaht'
              }
          }
      },  // 配置多个代理
  },
  chainWebpack: (config)=>{
    //修改文件引入自定义路径
    config.resolve.alias
        .set('@', resolve('src'))
        .set('@components', resolve('src/components'))
        .set('@pages', resolve('src/pages'))
        .set('@views', resolve('src/views'))
        .set('@utils', resolve('src/utils'))
        .set('static', resolve('static'))
    }
}