> https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code

16年的时候说是打开谷歌自带的DevTools 这个插件的调试就会被断掉，等等测试一下看看能同时开不。（已经解决了\^_^，现在用这个插件就非常爽了）

# 基本使用
1. 安装Debugger for Chrome插件（这不是废话么？）
1. 按F5（或选择菜单栏的Debug->Start Debuging），然后选择Chrome，就会自动创建默认的配置文件
1. 修改配置文件（下面会抛一块调试使用webpack打包的项目的砖）
1. 这时就可以下断点，按F5调试了


# webpack示例
首先要先把基本使用做完，遇到问题可以先看下这里：https://github.com/Microsoft/vscode-chrome-debug

我是按照三步走战略就可以调试了（一开始port弄混了，白费了好大功夫）

## 一：配置Chrome（重要！！！）
附加到已经打开的标签页上必须保证Chrome是配置了`--remote-debugging-port`打开的！！！

我用的是Windows配置方法如下：
1. 找到默认打开Chrome的快捷方式，一般是`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Google Chrome`
2. 目标后面加上`--remote-debugging-port`配置，如：`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222`

## 二：配置webpack
package.json的scripts和devDependencies
```

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development"
},
"devDependencies": {
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.7"
}

```

webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
    port: 3000
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## 三：配置launch.json
注意：port是指远程调试的port（刚刚Chrome配置的），网站直接写上url就行！！！虽然默认就是9222，但我测试时不配置会报`connect ECONNREFUSED 127.0.0.1:9229`这种连接不上其他的端口的错（可能是发现端口占用了自动用了下一个，我Chrome只配置了9222其他端口肯定连接不上），所以还是配置上吧
```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach to Chrome",
      "url": "http://localhost:3000",
      "port": 9222,
      "sourceMaps": true,
      "webRoot": "${workspaceRoot}" 
    }
  ]
}

```

