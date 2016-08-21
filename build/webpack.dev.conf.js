var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var fs = require("fs");
var path = require("path");

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


var ops = {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // })
  ]
}

var pages = function() {
  var dir = fs.readdirSync(path.resolve(__dirname, '../views/'));
  return dir.filter(function(name) {
    return name.match(/\.html$/);
  });
}();

for(var i = 0; i<pages.length; i++){
  var chunkname = pages[i];
  console.log(chunkname)
  var conf = {
    filename: chunkname,
    template: path.resolve(__dirname, '../views/'+chunkname),
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: false
    },
    chunks: [chunkname.replace(/\.html/, "")],
    // chunks: ['common','app'],  //此处是载入提取的公共js，以及jade同名js
    hash: false
  }
  
  ops.plugins.push(new HtmlWebpackPlugin(conf));
}


/*
//处理html
var pages = getEntry('./app/web/*.jade');
for(var chunkname in pages){
  var conf = {
    filename: chunkname+'.html',
    template: pages[chunkname],
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: false
    },
    chunks: ['common',chunkname],  //此处是载入提取的公共js，以及jade同名js
    hash: false,
    complieConfig: compileConfig  //向jade模板传递一些数据
  }
  var titleC = compileConfig.title || {};
  var title = titleC[chunkname];
  if (title) {
    conf.title = title;
  }
  plugins.push(new HtmlWebpackPlugin(conf));
}


new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
    filename: './view/index.html', //生成的html存放路径，相对于path
    template: './src/view/index.html', //html模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
    minify: { //压缩HTML文件    
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
    }
})

 */


module.exports = merge(baseWebpackConfig, ops)
