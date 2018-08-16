babel：将ES6翻译为ES5

# 问题：
## 可以处理import和export么？
不能，还是用gulp什么的打包一下吧

## 可以处理Promise么？
不能，还是使用babel-plugin-transform-runtime或者babel-polyfill吧

> http://www.ruanyifeng.com/blog/2016/01/babel.html  
Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。Babel 默认不转码的 API 非常多，详细清单可以查看 [definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js) 文件

> http://babeljs.io/docs/en#polyfill  
Since Babel only transforms syntax (like arrow functions), you can use babel-polyfill in order to support new globals such as Promise or new native methods like String.padStart (left-pad). It uses core-js and regenerator. Check out our babel-polyfill docs for more info.

# 插件：
## [babel-polyfill](http://babeljs.io/docs/en/babel-polyfill)

这个插件是要写入到最后生成的JS文件中的，在浏览器执行JS时先运行polyfill将特性加到全局环境（生成器函数倒是需要翻译源代码）。

> This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.

- gulp下使用polyfill

```
gulp.task('scripts', function() {
    return gulp.src([
        // ！！！加上这个就OK
        'node_modules/babel-polyfill/dist/polyfill.js',
        'src/js/helpers/*.js',
        'src/js/*.js',
      ])
      .pipe(babel({
        presets: ['env'],
        plugins: ['babel-polyfill']
      }))
      .pipe(concat('custom.js'))
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});

```
## [babel-plugin-transform-runtime](http://babeljs.io/docs/en/babel-plugin-transform-runtime/)

暂时还没用上。。


# gulp下使用
https://www.npmjs.com/package/gulp-babel

