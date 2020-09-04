-   伪类：`link` - `visited` - `focus` - `hover` - `active`

-   继承的声明没有特殊性（比 `0,0,0,0` 都小）

```html
<style>
        * {/*0,0,0,0*/
            color: violet;
        }

        .box {/*0,0,1,0*/
            color: aqua;
        }
    </style>
</head>

<div class="box">
    <span>
        test (color: violet)
    </span>
</div>
```

-   继承向下传播，有一个例外：body 背景会传递给 html

```html
<!DOCTYPE html>
<html lang="en">
  <!-- background: tomato -->

  <head>
    <style>
      body {
        height: 200px;
        margin: 50px;
        background: tomato;
      }
    </style>
  </head>

  <body></body>
</html>
```

-   用户代理（浏览器）样式声明、插件样式声明（）和网站作者样式声明的优先级：

1.  Declarations in user agent style sheets (e.g. the browser's default styles, used when no other styling is set).
2.  Normal declarations in user style sheets (custom styles set by a user).
3.  Normal declarations in author style sheets (these are the styles set by us, the web developers).
4.  Important declarations in author style sheets
5.  Important declarations in user style sheets

[css - What is "User stylesheet" in Google Chrome's developer tools? - Stack Overflow](https://stackoverflow.com/questions/24465939/what-is-user-stylesheet-in-google-chromes-developer-tools)

# 值和单位

-   Web 安全颜色：在 256 色计算机上总能避免抖动的颜色，包括：0、3、6、9、C、F 组成的三元组。
-   `ex` 小写 x 的高度。
-   `1in = 2.54cm = 96px = 72pt`，经测试不同 DPR（设备像素比）他们的展示都是一样的。
