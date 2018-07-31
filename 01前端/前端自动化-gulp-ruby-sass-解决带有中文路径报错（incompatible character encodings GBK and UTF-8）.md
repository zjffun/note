# 注意：错误提示真的是非常重要的！！！

今天gulp一个外国人的项目时编译sass时提示
```
Encoding::CompatibilityError: incompatible character encodings: GBK and UTF-8
  Use --trace for backtrace.
```
结果还一直能编译出来，改了sass编译出来的东西还和原来一样，也是醉了（估计是什么时候给缓存了）。原本都写明白了使用`--trace`回溯，但我还是想着查查看看有人解决没，经过一番波折，还是用命令行加上`--trace`但用命令行根本不会报错，又经过一番波折在使用gulp-ruby-sass时2配置`--trace`找到了错误的地方改掉了。（还不知道为啥命令行为什么很ojrk）

# 我的解决步骤如下

## 一：gulp-ruby-sass配置`--trace`定位错误

- sass(source, [options])  
在options里配置`{trace: true}`

```
const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
 
gulp.task('sass', () =>
    sass('source/file.scss', {trace: true})
        .on('error', sass.logError)
        .pipe(gulp.dest('result'))
);
```

## 找到错误信息

注意sass版本！！！
```
 C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/sass-3.5.5/lib/sass/importers/filesystem.rb:87:in `index': incompatible character encodings: GBK and UTF-8 (Encoding::CompatibilityError)
    from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/sass-3.5.5/lib/sass/importers/filesystem.rb:87:in `remove_root'
```

## 排除错误（将gbk转为utf-8编码）

http://ruby-doc.org/core-2.5.1/String.html#method-i-encode

- encode(dst_encoding, src_encoding [, options] ) → str  
（目标编码，原编码，[选项]）

87行改为：`if name.encode("utf-8", "gbk").index(@root + "/") == 0`

> 参考：https://www.cnblogs.com/xmzxy1986/p/7506919.html

