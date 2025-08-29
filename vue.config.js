const { name } = require('./package.json')

module.exports = {
  publicPath: '/', // 打包相对路径
  devServer: {
    port: 7664, // 运行端口号
    headers: {
      'Access-Control-Allow-Origin': '*' // 防止加载时跨域
    }
  },
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      // webpack5.0以上版本使用如下字段
      chunkLoadingGlobal: `webpackJsonp_${name}`
    }
  }
}
