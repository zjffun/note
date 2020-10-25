---
updated: 'Wed, 12 Feb 2020 07:04:06 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

今天 gulp 一个项目编译 sass 时提示

```
Encoding::CompatibilityError: incompatible character encodings: GBK and UTF-8
  Use --trace for backtrace.
```

# 解决步骤

## 一：gulp-ruby-sass 配置`--trace`定位错误

-   `sass(source, [options])`
    在 options 里配置`{trace: true}`

    const gulp = require('gulp');
    const sass = require('gulp-ruby-sass');

    gulp.task('sass', () =>
    sass('source/file.scss', {trace: true})
    .on('error', sass.logError)
    .pipe(gulp.dest('result'))
    );

## 找到错误信息

注意 sass 版本！！！

```
 C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/sass-3.5.5/lib/sass/importers/filesystem.rb:87:in `index': incompatible character encodings: GBK and UTF-8 (Encoding::CompatibilityError)
    from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/sass-3.5.5/lib/sass/importers/filesystem.rb:87:in `remove_root'
```

## 排除错误（将 gbk 转为 utf-8 编码）

<http://ruby-doc.org/core-2.5.1/String.html#method-i-encode>

-   `encode(dst_encoding, src_encoding [, options] )` → str\
    （目标编码，原编码，\[选项]）

87 行改为：`if name.encode("utf-8", "gbk").index(@root + "/") == 0`

> 参考：<https://www.cnblogs.com/xmzxy1986/p/7506919.html>
