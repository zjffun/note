在学习前端自动化之前一直使用 PHP，JSP 将在每个页面将头部、侧栏、底部等部分引入，现在前端 “娱乐圈” 一直噼里啪啦的每天出新东西，自从接触了前端自动化我就觉得这种工作可以交给前端了但一直没时间研究一下。最近有时间看一下，踩了好多坑终于成功实现了。。

# 准备工作

-   [学习 webpack](https://www.webpackjs.com/guides/)
-   [学习 html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
-   [学习 ejs-loader](https://github.com/okonet/ejs-loader)

感觉有些关键点文档中没提到，我下面会一一列举出来

# 最终文件结构

    ├─.gitignore
    ├─package-lock.json
    ├─package.json
    ├─webpack.config.js
    ├─src
    |  ├─form.ejs
    |  ├─index.ejs
    |  ├─index.js
    |  ├─style.css
    |  ├─table.ejs
    |  ├─templates
    |  |     ├─footer.ejs
    |  |     ├─header.ejs
    |  |     ├─left.ejs
    |  |     └─nav.ejs

# webpack 配置文件（webpack.config.js）

这里假设大家已经做好了准备工作，会基本的 webpack 使用，且已经安装了 html-webpack-plugin 和 ejs-loader

    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
       // 注意0：相对路径的"./"要写上（省略掉会报各种错误。。）
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

# 模板文件（.ejs）

具体看还是看[note/01 前端 / webpack - 使用 html-webpack-plugin 和 ejs-loader 将侧栏、头部、底部公共 html 做成模板，并生成合并后的 html 页面 at master · 1010543618/note](https://github.com/1010543618/note/tree/master/01%E5%89%8D%E7%AB%AF/webpack-%E4%BD%BF%E7%94%A8html-webpack-plugin%E5%92%8Cejs-loader%E5%B0%86%E4%BE%A7%E6%A0%8F%E3%80%81%E5%A4%B4%E9%83%A8%E3%80%81%E5%BA%95%E9%83%A8%E5%85%AC%E5%85%B1html%E5%81%9A%E6%88%90%E6%A8%A1%E6%9D%BF%EF%BC%8C%E5%B9%B6%E7%94%9F%E6%88%90%E5%90%88%E5%B9%B6%E5%90%8E%E7%9A%84html%E9%A1%B5%E9%9D%A2)吧

注意：ejs 本来是用`<%- include('xxx') %>`引如模板的，而我测试 ejs-loader 不能这么用得用`<%= require('xxx')() %>`（ejs-loader 处理后是个方法，调用该方法会返回处理后的 HTML）

index.ejs

    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
    <%= require('./templates/header.ejs')() %>
      <!-- Here is our page's main content -->
      <main>
        <!-- It contains an article -->
        <article>
          <h2>Article heading</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris. Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>

          <h3>subsection</h3>

          <p>Donec ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>

          <p>Pelientesque auctor nisi id magna consequat sagittis. Curabitur dapibus, enim sit amet elit pharetra tincidunt feugiat nist imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros.</p>

          <h3>Another subsection</h3>

          <p>Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum soclis natoque penatibus et manis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.</p>

          <p>Vivamus fermentum semper porta. Nunc diam velit, adipscing ut tristique vitae sagittis vel odio. Maecenas convallis ullamcorper ultricied. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, is fringille sem nunc vet mi.</p>
        </article>
        <%= require('./templates/left.ejs')() %>
      </main>
    <%= require('./templates/footer.ejs')() %>
    </body>
    </html>

header.ejs

    <!-- Here is our main header that is used across all the pages of our website -->
    <header><h1>我来组成<span>头部</span></h1></header>
    <%= require('./nav.ejs')() %>

nav.ejs

    <nav>
      <ul>
        <li><a href="#">不</a></li>
        <li><a href="#">加上</a></li>
        <li><a href="#">一个</a></li>
        <li><a href="#">导航</a></li>
        <li><a href="#">么！？</a></li>
      </ul>

       <!-- A Search form is another commmon non-linear way to navigate through a website. -->

       <form>
         <input type="search" name="q" placeholder="侵犯！乌贼娘">
         <input type="submit" value="搜一搜">
       </form>
    </nav>
