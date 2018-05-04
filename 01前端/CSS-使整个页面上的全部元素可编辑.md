
# [在线预览](https://jsfiddle.net/1010543618/6zu1gush/)

## 方法一
- 使用html的contenteditable属性：  
[HTML 5 全局 contenteditable 属性](http://www.w3school.com.cn/html5/att_global_contenteditable.asp)

## 方法二
- 使用css的user-modify属性：  
[-webkit-user-modify](http://css-infos.net/property/-webkit-user-modify)  
[-moz-user-modify](https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-user-modify)（不知为何我测试的时候不好使）


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    /* || General setup */
    html, body {
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 10px;
      background-color: #a9a9a9;
    }

    body {
      width: 70%;
      margin: 0 auto;
    }

    /* || typography */

    h1, h2, h3 {
      font-family: 'Sonsie One', cursive;
      color: #2a2a2a;
    }

    p, input, li {
      font-family: 'Open Sans Condensed', sans-serif;
      color: #2a2a2a;
    }

    h1 {
      font-size: 4rem;
      text-align: center;
      color: white;
      text-shadow: 2px 2px 10px black;
    }

    h2 {
      font-size: 3rem;
      text-align: center;
    }

    h3 {
      font-size: 2.2rem;
    }

    p, li {
      font-size: 1.6rem;
      line-height: 1.5;
    }
    span {
      color: green;
    }
    /* || header layout */

    nav, article, aside, footer {
      background-color: white;
      padding: 1%;
    }

    nav {
      height: 50px;
      background-color: #ff80ff;
      display: flex;
      margin-bottom: 10px;
    }

    nav ul {
      padding: 0;
      list-style-type: none;
      flex: 2;
      display: flex;
    }

    nav li {
      display: inline;
      text-align: center;
      flex: 1;
    }

    nav a {
      display: inline-block;
      font-size: 2rem;
      text-transform: uppercase;
      text-decoration: none;
      color: black;
    }

    nav form {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 2em;
    }

    input {
      font-size: 1.6rem;
      height: 32px;
    }

    input[type="search"] {
      flex: 3;
    }

    input[type="submit"] {
      flex: 1;
      margin-left: 1rem;
      background: #333;
      border: 0;
      color: white;
    }

    /* || main layout */

    main {
      display: flex;
    }

    article {
      flex: 4;
    }

    aside {
      flex: 1;
      margin-left: 10px;
      background-color: #ff80ff;
    }

    aside li {
      padding-bottom: 10px;
    }

    footer {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <!-- Here is our main header that is used across all the pages of our website -->
  <header><h1>我来组成<span>头部</span></h1></header>
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

    <!-- the aside content can also be nested within the main content -->
    <aside>
      <h2>Related</h2>

      <ul>
        <li><a href="#">Oh I do like to be beside the seaside</a></li>
        <li><a href="#">Oh I do like to be beside the sea</a></li>
        <li><a href="#">Although in the North of England</a></li>
        <li><a href="#">It never stops raining</a></li>
        <li><a href="#">Oh well...</a></li>
      </ul>
    </aside>

  </main>

  <!-- And here is our main footer that is used across all the pages of our website -->
  <footer>©Copyright来组成<span>脚部</span></footer>
  <script>
    var all_ele = document.querySelector('body').querySelectorAll('*');
    for (var i = 0; i < all_ele.length; i++) {
      console.log(all_ele[i])
      // 1.contentEditable
      all_ele[i].contentEditable = true;
      // 2.user-modify
      //all_ele[i].setAttribute('style',"-moz-user-modify: read-write;-webkit-user-modify: read-write;");
    }
  </script>
</body>
</html>
```