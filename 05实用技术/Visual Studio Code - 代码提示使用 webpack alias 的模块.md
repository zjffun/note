# 使用 PathIntellisense 还是使用`jsconfig.json`？

使用 [PathIntellisense](https://github.com/ChristianKohler/PathIntellisense) 只能提示模块路径，并无法让 vs code 的 Intellisense 知道这个模块的信息。

进过一番查找使用`jsconfig.json`配置可以很好的解决这个问题，只需配置`paths`即可，例如，配置`@`为源码目录：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

# 参考

> -   [Make VS code read webpack.config and recognize path with alias? - Stack Overflow](https://stackoverflow.com/questions/38044010/make-vs-code-read-webpack-config-and-recognize-path-with-alias)
> -   [jsconfig.json Reference - using-webpack-aliases](https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases)
