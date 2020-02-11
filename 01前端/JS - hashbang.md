[tc39/proposal-hashbang: #! for JS](https://github.com/tc39/proposal-hashbang)

某些奇怪的报错可能是因为系统不支持 Shebangs / Hashbang 导致的。

貌似 Node.js 已经支持这个新特性了，使用[fork](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options)时可以传入 shell 脚本。

如：

用法 `./scripts/build.js`和`fork(join(process.cwd(), 'node_modules/.bin/xxx'))`需要系统支持 Shebangs / Hashbang

用法`node ./scripts/build.js`和`fork(join(process.cwd(), 'node_modules/xxx/cli.js'))`不需要系统支持 Shebangs / Hashbang
