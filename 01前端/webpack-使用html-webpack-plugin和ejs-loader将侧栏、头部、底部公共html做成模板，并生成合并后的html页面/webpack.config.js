const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   // 注意0：相对路径的"./"要写上（像html中省略掉会报各种错误。。）
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 注意1：这里的后缀要和module.rules配置的ejs-loader的一样才能自动去用ejs-loader语法解析，否则要手动指定（用ejs-loader!src/index.ejs）
      template: './src/index.ejs',
    }),
    new HtmlWebpackPlugin({
      filename: 'table.html',
      template: './src/table.ejs',
    }),
    new HtmlWebpackPlugin({
      filename: 'form.html',
      template: './src/form.ejs',
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // 注意2：虽然html-webpack-plugin会默认解析ejs语法，但我测试的时候无法解析导入的侧栏、头部、底部的模板
      {
        test: /\.ejs$/,
        loader: "ejs-loader?variable=data"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};