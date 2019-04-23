# 从`node_modules` 加载模块的过程

如果要加载的模块非核心模块，并且路径不是`'/'`、 `'../'`和`'./'`开头，这个模块就会从当前文件夹递归向上在`node_modules`文件夹中寻找这个模块。

# lerna 提升

使用 lerna 提升会将共享的模块提升，安装到项目顶层的`node_modules`文件夹

优点：减少开发和构建环境中大量软件包副本的时间和空间需求

缺点：

1.  对于未严格遵循模块解析规范无法正常工作（建议将工具升级到更兼容的模式）
2.  可能忘记将依赖加入`dependencies`（可以使用[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)在导入未加入`dependencies`的包是发出警告）

# 参见

-   <https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders>
-   <https://github.com/lerna/lerna/blob/master/doc/hoist.md>
