第 3 章 基本概念

## 3.5.2 位操作符

> ECMAScript 中所有数值都是以 IEEE-754 64 位格式存储，但位操作符并不直接操作 64 位的值。而是先将 64 位的值转换成 32 位的整数，然后执行操作，最后再将结果转换为 64 位。（对于开发人员 64 位存储格式是透明的，因此整个过程像是只存在 32 位的整数一样）

## 3.5.6 关系操作符

-   比较的操作数为对象，则调用 valueOf() 方法（没有 valueOf() 调用 toString() 方法），用得到的值进行比较
-   比较的操作数为布尔值，则转换为数字比较

## 3.7.1 理解参数

-   修改 arguments 数组会改变形参的值（这并不是说它们访问相同的内存空间；它们的内存空间是独立的，但它们的值会同步。比如未传入形参时，修改了 arguments 数组形参值也不会变）

<!---->

    function func(para1, para2){
      console.log('修改前', arguments , para1, para2);
      arguments [0] = 'arguements_0';
      arguments [1] = 'arguements_1';
      console.log('修改后', arguments , para1, para2);
    }
    func('para1')

-   arguments 对象的长度是由传入的参数个数决定的，不是由定义函数时的命名参数的个数决定的。
-   ECMAScript 中的参数都是值传递，不存在引用传递

# 第 4 章 变量、作用域和内存问题

## 4.1 基本类型和引用类型的值

基本类型：

1.  Undefined
2.  Null
3.  Boolean
4.  Number
5.  String（注意 String 是基本类型）

基本类型的值无法添加属性（尽管这样不会报错），eg：

    var name = "zhang";
    name.age = 17;
    console.log(name.age);// undefined

引用类型：

1.  Object

### 4.1.3 传递参数

> ECMAScript 中所有函数的参数都是按值传递的。

eg：这里的 obj 形参是创建了一个指针让他与 person 指针指向同一个地址，obj 和 person 都指向同一个地址，但改变 obj 的指向 person 不改变

    function setName(obj) {
        obj.name = "Nicholas";
        obj = new Object();
        obj.name = "Greg";
    }
    var person = new Object();
    setName(person);
    alert(person.name); //"Nicholas"

### 4.2.2 没有块级作用域

> 使用 var 声明的变量会自动被添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境；在 with 语句中，最接近的环境是函数环境。如果初始化变量时没有使用 var 声明，该变量会自动被添加到全局环境。

    // 1.if
    if (true) {
        var color = "blue";
    }
    alert(color); //"blue"

    // 2.for
    for (var i=0; i < 10; i++){
    }
    alert(i); //10

    // 3.function
    function add(num1, num2) {
        var sum = num1 + num2;
        return sum;
    }
    alert(sum); //由于 sum 不是有效的变量，因此会导致错误

现在使用 ES6 的`let`会声明块级作用域变量。

## 4.3 垃圾收集

常用标记清除，不常用引用计数

# 第 5 章 引用类型

## 5.2 Array 类型

> 如果 slice() 方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。例如，在一个包含 5 项的数组上调用 slice(-2,-1) 与调用 slice(3,4) 得到的结果相同。如果结束位置小于起始位置，则返回空数组。

### 5.2.8 迭代方法

-   every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
-   filter()：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
-   forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。
-   map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
-   some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true

### 5.2.9 归并方法

> ECMAScript 5 还新增了两个归并数组的方法： reduce() 和 reduceRight()。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。其中， reduce() 方法从数组的第一项开始，逐个遍历到最后。而 reduceRight() 则从数组的最后一项开始，向前遍历到第一项。

# 第 6 章 面向对象的程序设计

## 6.1.1 属性类型

1.  数据属性
2.  访问器属性（VUE 双向绑定实现的基础）

## 6.2 创建对象

1.  工厂模式（使用函数创建对象，为对象添加属性和方法然后返回对象，被构造函数模式取代）

    ```javascript
    function createPersion(name, age) {
        return {
            name,
            age
        }
    }

    var p1 = createPersion("zhang", 17);
    var p2 = createPersion("foo", 18);
    ```

2.  构造函数模式（每个实例不共用属性和方法，JS 中函数是对象）

    ```javascript
    function Persion(name, age) {
        this.name = name;
        this.age = age;
        this.print = function () {
            console.log(this.name);
        }
    }

    var p1 = new Persion("zhang", 17);
    var p2 = new Persion("foo", 18);
    ```

3.  原型模式（每个实例共用一套属性和方法）

    ```javascript
    function Persion() {}
    Persion.prototype.name = "zhang";
    Persion.prototype.age = 17;
    Persion.prototype.print = function () {
        console.log(this.name);
    }

    var p1 = new Persion();
    var p2 = new Persion();
    ```

4.  组合使用构造函数模式和原型模式（既有共用又有不共用的属性和方法）

    -   这是目前使用最广泛的创建自定义类型的方法。

    -   使用对象覆盖原型（字面量方式修改原型）要注意已经创建的实例的`constructor`指针不会自动变（还是覆盖前的原型）。

    ```javascript
    function Persion(name, age) {
        this.name = name;
        this.age = age;
    }
    Persion.prototype = {
        constructor: Persion,
        print: function () {
            console.log(this.name);
        }
    }

    var p1 = new Persion("zhang", 17);
    var p2 = new Persion("foo", 18);
    ```

5.  动态原型模式（给原型添加属性的操作放到构造函数内）

    ```javascript
    function Persion(name, age) {
        this.name = name;
        this.age = age;
        // 第一次执行时初始化
        if (typeof this.print !== "function") {
            Persion.prototype.print = function () {
                console.log(this.name);
            }
        }
    }

    var p1 = new Persion("zhang", 17);
    var p2 = new Persion("foo", 18);
    ```

6.  寄生构造函数模式（和工厂模式几乎一样，可以为对象创建构造函数）

    ```javascript
    function MyArray(){
        let arr = new Array();
        arr.push.apply(arr, arguments);
        arr.toPipeString = function(){
            return this.join("|");
        }
        return arr;
    }

    var marr = new MyArray(1,2,3);
    console.log(marr.toPipeString());
    ```

7.  稳妥构造函数模式

    -   稳妥对象：没有公共属性，方法也不引用`this`对象。适合用在安全环境中，或防止数据被其他程序改动。

    ```javascript
    function Persion(name, age) {
        var o = {};

        // 除了使用 print 没有其他方法能获取到 name
        o.print = function () {
            console.log(name);
        }
        return o;
    }

    var p1 = new Persion("zhang", 17);
    var p2 = new Persion("foo", 18);
    ```

## 6.3 继承

OO 语言支持两种继承：接口继承和实现继承。由于函数没有签名，ES 无法实现接口继承。

1.  原型链

    有两个问题：1 属性共享， 2 无法参数传递

    ```javascript
    function SuperType(para) {
        this.property = true;
        this.arr = [1, 2, 3];
        this.para = para;
    }

    SuperType.prototype.getSuperProp = function () {
        return this.property;
    }

    function SubType() {
        this.subproperty = false;
    }

    // 继承(这时 SubType.prototype.constructor 属性没有了，SubType.[[prototype]].constructor 为 SuperType)
    SubType.prototype = new SuperType();

    SubType.prototype.getSubProp = function () {
        return this.subproperty;
    }

    // 问题1：无法向父类构造函数传值
    var instance1 = new SubType();
    var instance2 = new SubType();

    // 问题2：instance2.arr 也改变了
    instance1.arr.push(4);
    ```

2.  借用构造函数

    和创建对象的构造函数模式的问题一样，每个实例不共用属性和方法。

    ```javascript
    function SuperType(para) {
        this.para = para;
        this.getPara = function(){
            return this.para;
        }
    }

    function SubType() {
        SuperType.apply(this, arguments);
    }

    // 可以向父类构造函数传值
    var instance1 = new SubType("instance1");
    var instance2 = new SubType("instance2");
    ```

3.  组合继承

    原型链 + 借用构造函数

    JS 中最常用的继承模式。

    ```javascript
    function SuperType(para) {
        this.property = true;
        this.arr = [1, 2, 3];
        this.para = para;
    }

    SuperType.prototype.getSuperProp = function () {
        return this.property;
    }

    function SubType() {
        SuperType.apply(this, arguments);
        this.subproperty = false;
    }

    // 继承
    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;

    SubType.prototype.getSubProp = function () {
        return this.subproperty;
    }

    // 可以向父类构造函数传值
    var instance1 = new SubType("instance1");
    var instance2 = new SubType("instance2");

    // instance2.arr 不变
    instance1.arr.push(4);
    ```

4.  原型式继承

    有两个问题：1 属性会共享，2 每个实例无法共用方法

    ```javascript
    function createObj(obj) {
        function f() {};
        f.prototype = obj;
        return new f();
    }

    var person = {
        name: "zhang",
        age: [17]
    }

    // person、 zi 和 ma 共用引用属性 age
    var zi = createObj(person);
    var ma = createObj(person);

    zi.age.push(18);
    ma.age.push(17);
    console.log(person.age);
    ```

5.  寄生式继承

    和创建对象的寄生构造函数模式类似，也有属性会共享的问题

    ```javascript
    function createObjParasitic(obj) {
        let o = Object.create(obj);
        // o 目前是如下对象：
        // {
        //     [[prototype]] = obj
        // }
        o.sayHi = function () {
            console.log("hi")
        }
        return o;
    }

    var person = {
        name: "zhang",
        age: [17]
    }

    var zi = createObjParasitic(person);

    zi.sayHi();
    ```

6.  寄生组合式继承

    寄生式继承 + 组合式继承

    将`new SuperType()`改为`Object.create(SuperType.prototype)`减少一次父类的调用，还避免了在`SubType.prototype`上添加不必要的属性（如：下面的`property`和`arr`属性）。

    ```javascript
    function inheritPrototype(sub, sup) {
        // 使 sub.prototype 的 [[prototype]] “指针”指向 sup.prototype
        sub.prototype = Object.create(sup.prototype);
        sub.prototype.constructor = sub;
    }

    function SuperType() {
        this.property = true;
        this.arr = [1, 2, 3];
    }

    SuperType.prototype.getSuperProp = function () {
        return this.property;
    }

    function SubType() {
        SuperType.apply(this, arguments);
        this.subproperty = false;
    }

    inheritPrototype(SubType, SuperType);

    console.log((new SubType()).getSuperProp());
    ```

# 第 7 章 函数表达式

定义函数有两种形式：函数声明（会函数声明提升）和函数表达式。

## 7.2 闭包

> 闭包指有权访问另一个函数作用域中的变量的函数。

### 7.2.2 关于 this 对象

> 每个函数在被调用时都会自动取得两个特殊变量： this 和 arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量。不过，把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了。

如果想访问作用域中的 this 和 arguments 对象必须把她们保存在闭包可以访问的变量中。

```javascript
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            // this指向window
            return this.name;
        };
    }
};
console.log(object.getNameFunc()()); //"The Window"（在非严格模式下）

var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        var that = this;
        return function () {
            // 闭包可以访问that
            // this指向window，that指向object
            return that.name;
        };
    }
};
console.log(object.getNameFunc()()); //"My Object"
```

## 7.4 私有变量

JS 中没有使用成员的概念，所有对象属性都是共有的。但在函数中定义的变量都可以认为是私有比阿尼浪，因为不能在函数外部访问这些变量（包括：参数、局部变量和函数内部定义的其他函数）。

### 7.4.2 模块模式

JS 以字面量的方式创建单例对象。

```javascript
var singleton = {
    name: "xxx",
    method: function () {
        // ...
    }
}
```

### 7.4.3 增强的模块模式

```javascript
// 这时 function(){...}() 是当做语句解析的
var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new BaseComponent());
    //创建 application 的一个局部副本
    var app = new BaseComponent();
    //公共接口
    app.getComponentCount = function(){
        return components.length;
    };
    app.registerComponent = function(component){
        if (typeof component == "object"){
             components.push(component);
        }
    };
    //返回这个副本
    return app;
}();
```

# 第 8 章 BOM

## 8.1 window 对象

BOM 的核心是 window 对象，它表示浏览器的一个实例，同时也是 ES 中规定的 Global 对象。

### 8.1.2 窗口关系及框架

> 如果页面中包含框架，则每个框架都拥有自己的 window 对象，并且保存在 frames 集合中。在 frames 集合中，可以通过数值索引（从 0 开始，从左至右，从上到下）或者框架名称来访问相应的 window 对象。每个 window 对象都有一个 name 属性，其中包含框架的名称。
>
> 在使用框架的情况下，浏览器中会存在多个 Global 对象。在每个框架中定义的全局变量会自动成为框架中 window 对象的属性。由于每个 window 对象都包含原生类型的构造函数，因此每个框架都有一套自己的构造函数，这些构造函数一一对应，但并不相等。例如，`top.Object`并不等于`top.frames[0].Object`。这个问题会影响到对跨框架传递的对象使用`instanceof`操作符。

-   `window.top`对象始终指向最外层框架，也就是浏览器窗口
-   `window.parent`指向父窗口
-   `window.self`指向 window

### 8.1.3 窗口位置

窗口相对屏幕的位置：`window.screenLeft`和`window.screenTop`

窗口位置移动（默认是禁用的）：`window.moveTo()`和`window.moveBy()`

### 8.1.4 窗口大小

浏览器窗口大小（不同浏览器对这些属性的解释不同）：`window.innerHeight`、`window.innerWidth`、`window.outerWidth`和`window.outerWidth`

页面视口信息：`window.document.documentElement.clientWidth`和`window.document.documentElement.clientHeight`

浏览器窗口大小改变（默认是禁用的）：`window.resizeTo()`和`window.resizeBy()`

### 8.1.6 间歇调用和超时调用

> 一般认为，使用超时调用来模拟间歇调用是一种最佳模式。在开发环境下，很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。而像下面示例中那样使用超时调用，则完全可以避免这一点。所以，最好不要使用间歇调用。

    // 超时调用模拟间歇调用
    var num = 0;
    var max = 10;
    function incrementNumber() {
        num++;
        //如果执行次数未达到 max 设定的值，则设置另一次超时调用
        if (num < max) {
            setTimeout(incrementNumber, 500);
        } else {
            alert("Done");
        }
    }
    setTimeout(incrementNumber, 500);

## 8.2 location 对象

### 8.2.2 位置操作

```javascript
// 基本
location.assign("https://developer.mozilla.org")
// 下面两种和和显示调用 assign 方法一样
window.location = "https://developer.mozilla.org"
location.href = "https://developer.mozilla.org"
// 其他
location.hash = "#123"
location.pathname = "zh-CN"
// replace 的 location 不记录在历史记录中
location.replace("https://developer.mozilla.org")
```

## 8.3 navigator 对象

获取浏览器信息、主语言、插件、设置等信息。

## 8.4 screen 对象

用来获取浏览器窗口外部的显示器信息，如像素宽度、高度等。

## 8.5 history 对象

```javascript
// 跳转到最近的 mdn 界面
history.go("developer.mozilla.org");
```

# 第 9 章 客户端检测

-   能力（特性）检测：检测浏览器是否支持某项功能

```javascript
function isHostMethod(object, property) {
    var t = typeof object[property];
    return t === 'function' || (!!(t === 'object' && object[property])) || t === 'unknown';
}
console.log(isHostMethod([], 'find'));
```

-   怪癖检测：检测浏览器某项功能是否有 bug

```javascript
// 是否有将属性不列举的bug
var hasDontEnumQuirk = function() {
    var o = {
        // 这里新的 toString 应该要列举出来的，因为新的 toString 已经覆盖了旧的 [[Enumerable]] false 的 toString
        // 但 IE8 及更低版本的浏览器会不将 toString 列举。
        toString: function () {}
    };
    for (var prop in o) {
        if (prop === 'toString') {
            return false;
        }
    }
    return true;
}();
console.log(hasDontEnumQuirk());
```

-   用户代理检测：检测呈现引擎、浏览器、平台、设备和操作系统

    因为用户代理字符串有很长的发展历史，在此期间浏览器供应商试图在用户代理字符串中添加一些欺骗信息，让网站相信自己是另一种浏览器，使得用户代理检测比较复杂。但通过`navigator.userAgent`（大部分信息在这个字符串中），`navigator.platform`和`window`的属性还是可以检测出来呈现引擎、浏览器、平台、设备和操作系统这些信息的。

# 第 10 章 DOM

## 10.1 节点层次

HTML 页面中，文档元素始终是`<html>`元素，XML 中没有预定义的元素，任何元素都可能成为文档元素。

### 10.1.1 Node 接口

-   `nodeType`属性

每个节点都有`nodeType`属性，用于表示节点类型。节点类型在 Node 类型中定义的下列 12 个数值常量表示，任何节点的类型必居其一。

参见：[Node.nodeType - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)

-   `childNodes`属性

`childNodes`属性中保存着一个`NodeList`对象。

`NodeList`对象是一种类数组对象，但不是 Array 实例。

DOM 结构变化会自动反映在`NodeList`对象中，也就是说`NodeList`对象是动态变化的，而不是一张快照。

将`NodeList`对象转为数组：

```javascript
function convertToArray(nodes){
    return Array.prototype.slice.call(nodes, 0);
}
```

-   `clonNode()`方法

参数为 true 或 false，true 执行深复制（克隆子节点），false 执行浅复制（不克隆子节点）。

`clonNode()`方法不会复制 JS 的属性（IE 存在 bug，会复制时间处理程序）。

-   `normalize()`方法

    处理文档树中的文本节点。

### 10.1.2 Document 接口

Document 接口继承自 Node 接口，Document 接口描述了任何类型文档的公共属性和方法。

document 对象是 HTMLDocument 的一个实例。

-   `dcoumentElement`属性

取得`<html>`的引用

-   `doctype`属性

取得`<!DOCTYPE>`的引用

-   `titel`属性

修改`titel`属性不会改变`<title>`元素

-   `domain`属性

由于跨域安全限制，来自不同子域的页面无法通过 JS 通信。而将每个`document.domain`设置为相同的值，这些页面就可以互相访问对方包含的 JS 对象了。

`domain`属性修改有两个限制：1. 同源，2. 低级（eg：三级子域名`p2p.wrox.com`）向高级（eg：二级子域名`wrox.com`）。

-   `write`方法

页面加载过程调用会动态加入内容，页面加载结束后调用会重写整个页面内容。

### 10.1.3 Element 接口

所有 HTML 元素都是由 HTMLElement 类型或她的子类型表示。

-   `getAttribute()`方法

`getAttribute()`方法返回属性**值**，例如：使用属性访问 style 和 onclick 时分别返回对象和方法，使用`getAttribute()`方法返回字符串。

-   `attributes`属性

`attributes`属性包含一个 NamedNodeMap 对象，与 NodeList 类似是一个动态集合。

### 10.1.4 Text 接口

修改文本节点时，字符串会根据文档类型进行编码（将预留字符转义）。

-   `splitText()`方法

调用这个方法原来的文本节点变为从开始到指定位置之前的内容，返回剩下的内容。

### 10.1.8 DocumentFragment 类型

> 在所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。 DOM 规定文档片段（document fragment）是一种 “轻量级” 的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。

通过`apppendChild()`或`insertBefore()`将文档片段添加到文档中时，只会将文档片段的子节点添加到响应位置上，文档片段本身不会成为文档的一部分。例如：

```javascript
let fragment = document.createDocumentFragment();
let ul = document.createElement("ul");
let li = null;
for (let i = 0; i < 3; i++) {
  li = document.createElement("l1");
  li.appendChild(document.createTextNode("Item " + (i + 1)));
  fragment.appendChild(li);
}
document.body.appendChild(ul);
ul.appendChild(fragment);
```

## 10.2 DOM 操作技术

> 一般来说，尽量减少访问 NodeList 的次数。因为每次访问 NodeList，都会运行一次基于文档的查询。所以可以考虑将从 NodeList 中取得的值缓存起来。

# 第 11 章 DOM 拓展

## 11.2 元素遍历

对于元素间的空格，浏览器会当做文本节点（除了 IE9 之前的浏览器）。[Element Traversal Specification](https://www.w3.org/TR/ElementTraversal/)定义了一组新属性可以只访问 Element 节点。

遍历子元素：

```javascript
// 新
var child = document.body.firstElementChild;
while(child != document.body.lastElementChild){
    console.log(child);
    child = child.nextElementSibling;
}
// 旧
var child = document.body.firstChild;
while(child != document.body.lastChild){
    if(child.nodeType == 1){
        console.log(child);
	}
    child = child.nextSibling;
}
```

## 11.3 HTML5

### 11.3.2 交点管理

> HTML5 也添加了辅助管理 DOM 焦点的功能。
>
> 首先就是 `document.activeElement` 属性，这个属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入（通常是通过按 Tab 键）和在代码中调用`focus()`方法。
>
> 另外是新增了`document.hasFocus()`方法，用于判断文档是否获取焦点。

### 11.3.4 HTMLDocument 的变化

1.  readyState 属性：判断页面加载情况（旧方法是在触发 onload 事件时记录页面加载完成）。
2.  compatMode 属性：判断页面是标准（Standards）模式还是混杂（Quirks）模式（
    混杂模式下浏览器会尝试模拟**非常旧**的浏览器的行为）。
3.  head 属性：引用文档的 head 元素。
4.  charset 属性：获取和设置字符集。（MDN 中是`Document.characterSet`）

### 11.3.4 `scrollIntoView()`方法

> 通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。

# 第 12 章 DOM2 和 DOM3

## 12.1 DOM 变化

-   DOM Level 2 Core：为大多数 DOM1 方法提供特定与命名空间的版本（方法名中带有 NS）。
-   DOM Level 2 View
-   DOM Level 2 HTML

## 12.2 样式

### 12.2.1 访问元素的样式

> 多数情况下，都可以通过简单地转换属性名的格式来实现转换。其中一个不能直接转换的 CSS 属性就是 float。由于 float 是 JavaScript 中的保留字，因此不能用作属性名。“DOM2 级样式” 规范规定样式对象上相应的属性名应该是 cssFloat； Firefox、 Safari、 Opera 和 Chrome 都支持这个属性，而 IE 支持的则是 styleFloat。

实践中，最好始终指定度量单位（标准模式下所有的度量值必须指定单位，混杂模式下可以不指定单位）。

    <div id="myDiv">myDiv</div>
    <script>
        var myDiv = document.getElementById("myDiv");
        //浮动
        myDiv.style.cssFloat = "left";
        //背景颜色
        myDiv.style.backgroundColor = "red";
        //改变大小
        myDiv.style.width = "100px";
        myDiv.style.height = "200px";
        //指定边框
        myDiv.style.border = "1px solid black";
    </script>

### 12.2.2 操作样式表

### 12.2.3 元素大小

1.  偏移量 offsetTop/Left/Width/Height（Width 和 Height 包括边框）。
2.  客户区大小 clientTop/Left/Width/Height（width 和 height 不包括边框）。
3.  滚动大小 scrollTop/Left/Width/Height。
4.  确定元素大小`Element.getBoundClientRect()`。

## 12.3 遍历

NodeIterator 和 TreeWalker。IE 不支持！

## 12.4 范围

> 为了让开发人员更方便地控制页面，“DOM2 级遍历和范围” 模块定义了 “范围”（range）接口。通过范围可以选择文档中的一个区域，而不必考虑节点的界限（选择在后台完成，对用户是不可见的）。在常规的 DOM 操作不能更有效地修改文档时，使用范围往往可以达到目的。

# 第 13 章 事件

## 13.1 事件流

由于老版本浏览器不支持，因此很少有人使用事件捕获。建议放心使用事件冒泡，特殊需要时使用事件捕获。

### 13.1.1 事件冒泡

IE 提出的事件流叫事件冒泡（event bubling），事件由最具体（深）的节点向不具体（文档）节点传播。

### 13.1.2 事件捕获

Netscape 提出的事件流叫事件捕获（event capturing），思想是不太具体的节点应先接收到事件，具体的节点后接收到事件。

### 13.1.3 DOM 事件流

[UI Events-event-flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

> “DOM2 级事件” 规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

-   事件捕获：为截获事件提供机会（实际目标在捕获阶段不会接收到事件）
-   目标阶段：事件目标接收到事件
-   冒泡阶段：对事件作出响应

PS：多数浏览器都实现了在捕获阶段触发事件对象上的事件这种特定行为。即使 “DOM2 级事件” 规范明确要求捕获阶段不会涉及事件目标。

## 13.2 事件处理程序

诸如 click、load 和 mouseover 叫事件的名字。响应某个事件的函数叫做事件处理程序，事件处理程序的名字以‘’on“开头。

### 13.2.1 HTML 事件处理程序

> 某个元素支持的每种事件，都可以用一个与之相应事件处理程序同名的 HTML 特性来指定。

这样指定事件处理程序：首先会创建一个封装着元素属性值的函数，其次这种方式动态创建的函数会拓展作用域，例如：

```html
<!-- 1. 查看属相和参数 -->
<input type="button" value="click" onclick="console.log(arguments, event, this, value)">

<!-- 2. 拓展作用域 -->
<form>
    <input type="text" name="uname" value="zzz">
    <input type="button" value="click" onclick="console.log(uname.value)">
</form>
<!--
这个动态创建的函数像这样拓展作用域：
function(){
    with(document){
        with(this,form){
            with(this){
				console.log(uname.value)
            }
        }
    }
}
-->
```

### 13.2.2 DOM0 级事件处理程序

> 使用 DOM0 级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在
> 元素的作用域中运行；换句话说，程序中的 this 引用当前元素。来看一个例子。

```html
<button id="myBtn">myBtn</button>
<script>
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(this.id); //"myBtn"
};
</script>
```

将事件处理程序属性的值设置为 null 可以删除通过 DOM0 级方法指定的事件处理程序：
`btn.onclick = null;`

### 13.2.3 DOM2 级事件处理程序

> “DOM2 级事件” 定义了两个方法，用于处理指定和删除事件处理程序的操作：`addEventListener()` 和 `removeEventListener()`。所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。

```html
<button id="myBtn">myBtn</button>
<script>
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
    alert(this.id);
}, false);
btn.addEventListener("click", function(){
    alert("Hello world!");
}, false);
</script>
```

删除事件时必须传入绑定的事件的 “指针”。

### 13.2.4 IE 事件处理程序

> IE 实现了与 DOM 中类似的两个方法：`attachEvent()` 和 `detachEvent()`。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。由于 IE8 及更早版本只支持事件冒泡，所以通过 `attachEvent()`添加的事件处理程序都会被添加到冒泡阶段。

## 13.3 事件对象

### 13.3.1 DOM 中的事件对象

> 兼容 DOM 的浏览器会将一个 event 对象传入到事件处理程序中。无论指定事件处理程序时使用什么方法（DOM0 级或 DOM2 级），都会传入 event 对象。

event 对象的属性参见：[Event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event)

```html
<button id="myBtn">myBtn</button>
<script>
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
  alert(event.type); //"click"
};
btn.addEventListener("click", function(event){
  alert(event.type); //"click"
}, false);
</script>
```

### 13.2.2 IE 中的事件对象

DOM0 事件处理程序：event 对象作为 window 对象的一个属性存在。

`attachEvent()`添加事件处理程序：event 对象作为参数传入事件处理函数中，也可以通过 window 对象的 event 属相得到。

## 13.4 事件类型

DOM3 级事件类型：[DOM-Level-3-Events](https://www.w3.org/TR/DOM-Level-3-Events/#event-types)

-   User Interface Events debugger 
-   Focus Events 
-   Mouse Events 
-   Wheel Events 
-   Input Events 
-   Keyboard Events 
-   Composition Events：用于处理 IME 输入序列。IME（Input Method Editor）可以让用户输入在物理键盘上找不到的字符。例如，使用拉丁文键盘的用户通过 IME 可以输入日文字符。
-   变动（mutation）事件：底层 DOM 结构发生变化时触发。变动事件是为 XML 或 HTML DOM 设计的，并不特定于某种语言。

### 13.4.1 UI 事件

HTML 中无法访问 widow 元素，所以一般在 window 上面发生的任何事件都可以在`<body>`元素中通过相应特性指定。

### 13.4.3 鼠标与滚轮事件

mousedown、mouseup、click 和 dbclick 顺序：

1.  mousedown
2.  mouseup
3.  click
4.  mousedown
5.  mouseup
6.  dbclick

如果 mousedown 或 mouseup 中的一个被取消，click 事件就不会触发。

1.  客户区坐标位置：clientX|Y，鼠标指针在浏览器视口的水平和垂直位置
2.  页面坐标位置：pageX|Y，鼠标在页面中的位置
3.  屏幕坐标位置：screenX|Y，鼠标在电脑屏幕的位置
4.  相关元素：在执行 mouseover 和 mouseout 时 relatedTarget 提供了涉及到的（移入、移出的）元素的信息。
5.  触摸设备：
    iOS 和 Android 设备的实现非常特别，因为这些设备没有鼠标。在面向 iPhone 和 iPod 中的 Safari 开发时，要记住以下几点。
    -   不支持 dblclick 事件。双击浏览器窗口会放大画面，而且没有办法改变该行为。
    -   轻击可单击元素会触发 mousemove 事件。如果此操作会导致内容变化，将不再有其他事件发生；如果屏幕没有因此变化，那么会依次发生 mousedown、 mouseup 和 click 事件。轻击不可单击的元素不会触发任何事件。可单击的元素是指那些单击可产生默认操作的元素（如链接），或者那些已经被指定了 onclick 事件处理程序的元素。
    -   mousemove 事件也会触发 mouseover 和 mouseout 事件。
    -   两个手指放在屏幕上且页面随手指移动而滚动时会触发 mousewheel 和 scroll 事件。

### 13.4.4 键盘与文本事件

-   键盘事件：keydown、keypress、keyup

    按下字符键时：会先触发 keydown 然后触发 keypress 最后触发 keyup，按住不放时 keydown、keypress 会重复触发。

    按下非字符键时：会触发 keydown 最后触发 keyup，按住不放时 keydown 会重复触发。

-   文本事件：textInput

### 13.4.7 HTML5 事件

1.  contextmenu 事件：用户打开上下文菜单时触发（Windows 下是鼠标右键单击，Mac 下时 Ctrl + 单击），可以阻止默认的上下文菜单。

2.  beforeunload 事件：在页面卸载前触发，并弹出确认框让用户确认是否离开页面。这个事件不能彻底取消，因为那样就相当于让用户就无法离开当前页面了。。

3.  DOMContentLoaded 事件 ：

    > window 的 load 事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部资源过多而颇费周折。而 DOMContentLoaded 事件则在形成完整的 DOM 树之后就会触发，不理会图像、 JavaScript 文件、 CSS 文件或其他资源是否已经下载完毕。与 load 事件不同，DOMContentLoaded 支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。

4.  readystatechange 事件：提供与文档或元素加载状态有关的信息。

5.  pageshow 和 pagehide 事件：浏览器会缓存前进和后退的页面（bfcache, before-forward chache），页面位于 bfcache 中，load 事件不会触发，pageshow 事件会触发。

6.  hashchange 事件：页面 URL 中 "#" 后面的字符串发生变化时触发。

### 13.4.8 设备事件

智能手机和平板相关的事件，可以监测横竖屏切换、方向改变、移动。

### 13.4.9 触摸与手势事件

1.  触摸事件

    事件发生顺序入下

    1.  touchstart
    2.  mouseover
    3.  mousemove（一次）
    4.  mousedown
    5.  mouseup
    6.  click
    7.  touchend

2.  手势事件

## 13.5 内存和性能

### 13.5.1 事件委托

> 对 “事件处理程序过多” 问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如， click 事件会一直冒泡到 document 层次。也就是说，我们可以为整个页面指定一个 onclick 事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。

### 13.5.2 移除事件处理程序

通过手动去除事件处理程序的引用防止内存泄露。

## 13.6 模拟事件

### 13.6.1 DOM 中的事件模拟

步骤（1，2 步的方法已经过时，推荐直接用 new 创建 event 对象）：

1.  创建事件对象：在 documnet 对象上使用`createEvent()`方法创建 event 对象。
2.  初始化事件对象：调用 event 对象的`initXXXEvent()`方法。
3.  触发事件：目标元素调用`dispatchEvent()`方法。

例，模拟鼠标事件：

```html
<!-- 新 -->
<button id="btn" onclick="alert('clicked')">click me</button>
<script>
    var btn = document.querySelector("#btn");
    var event = new  MouseEvent("click", {button: 0});
    btn.dispatchEvent(event);
</script>

<!-- 过时 -->
<button id="btn2" onclick="alert('clicked Deprecated')">click me</button>
<script>
    var btn = document.querySelector("#btn2");
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, document.defaultView);
    btn.dispatchEvent(event);
</script>
```

# 第 14 章 表单脚本

## 14.1 表单基础知识

```html
<form>
	input1: <input type="text" name="i1">
	input2: <input type="text" name="i2" autofocus>
	<select name="s">
		<option>zzz</option>
		<option>jjj</option>
		<option>fff</option>
	</select>
</form>
<script>
	// 通过document.forms可以取得所有表单
	var forms = document.forms;

	// form 的 submit() 方法*不会*触发 submit 事件
	forms[0].addEventListener("submit", () => alert('submit'));
	// 取消下面这个注释会非常鬼畜
	// forms[0].submit();

	// form 的 reset() 方法*会*触发 reset 事件
	forms[0].addEventListener("reset", () => alert('reset'));
	forms[0].reset();

	// form 的 elements 属性是表单中元素的集合
	var filed = forms[0].elements[1];
	// 自动将焦点移动到输入框
	window.addEventListener("load", () => {
		// autofocus 属性在支持她的浏览器中应该为 true，不支持的为空字符串
		if(filed.autofocus !== true){
			filed.focus();
		}
	});

	// change 事件对于输入元素失去焦点(blur)触发，对于选择元素修改选项后触发
	forms[0].elements["i2"].addEventListener("change", () => {
		console.log("input change");
	});
	forms[0].elements["s"].addEventListener("change", () => {
		console.log("select change");
	});
</script>
```

## 14.2 文本框脚本

```html
<form>
	<!-- size : 可以显示的字符数 -->
	<input type="text" name="i1" value="initial value" size="4">
	<br>
	<!-- 第一个文本节点为初始值 -->
	<textarea name="t">initial value</textarea>
	<br>
	<!-- 绑定限制输入类型的事件 -->
	<input type="text" name="onlyNum">
	<br>
	<!-- 正则验证 -->
	<input type="text" pattern="\w+">
</form>
<script>
	var forms = document.forms;
	var input = forms[0].elements[0];
	var textarea = forms[0].elements[1];
	var onlyNumInput = forms[0].elements[2];

	// 不建议用 DOM 方法修改文本框的值（例如：修改 <textarea> 的第一个子节点，或使用 setAttribute() 来设置 value 属性）。
	// 因为这些修改不一定会反映在DOM中。
	// 建议像下面这样使用 value 属性读取和设置文本框的值。
	textarea.value = "new initial value";
	console.log(input.value);


	// 选择文本
	input.addEventListener("focus", (e) => {
		e.target.select();
	});

	// 取得选择文本
	console.log(input.value.substring(input.selectionStart, input.selectionEnd));
	
	// 选择部分文本
	textarea.setSelectionRange(3, 9);
	textarea.focus();

	// keydown 屏蔽字符（keypress 已经弃用了）
	onlyNumInput.addEventListener("keydown", (e) => {
		if(!/\d/.test(e.key) && !e.ctrlKey){
			e.preventDefault();
		}
	});

	// 屏蔽粘贴的字符
	onlyNumInput.addEventListener("paste", (e) => {
		if(!/\d/.test(e.clipboardData.getData("text"))){
			e.preventDefault();
		}
	});
</script>
```

## 14.3 选择框脚本

-   添加 / 删除选项：使用 DOM 方法（`appendChild()`、`removeChild()`）或选择框的方法（`add()`、`remove()`）
-   移动选项：使用`appendChild()`将一个选择框中的选项移动到另一个选择框
-   重排选项：使用`insertBefore()`移动选项的位置

## 14.4 表单序列化

目前还没有内置的表单序列化的方法，参见：[HTMLFormElement - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)。造序列化的轮子要注意制定表单字段的显示隐藏、是否禁用、按钮、单选多选等情况的处理。

## 14.5 富文本编辑

设置 iframe 的 designMode 属性可以使这个 iframe 可编辑。

### 14.5.1 使用 contenteditable 属性

通过设置元素的 contenteditable 属性控制该元素是否可编辑。

### 14.5.2 操作富文本

使用`document.execCommand()`执行预定义的命令。

### 14.5.3 富文本选区

使用 Selection 和 Range 的相关的属性和方法，参见：[Selection - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Selection)、[Range - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Range)。

设置选择的文本背景为黄色：

```html
<div id="rechedit" contenteditable="true" style="background: #ddd;">
	Hello world!
</div>
<button onclick="setbg()">setbg</button>
<script>
	function setbg(){
		var selection = document.getSelection(),
			range = selection.getRangeAt(0);
			span = document.createElement("span");
		// 设置背景
		span.style.backgroundColor = "yellow";
		// 设置到选区
		range.surroundContents(span);
	}
</script>
```

### 14.5.4 表单与富文本

> 由于富文本编辑是使用 iframe 而非表单控件实现的，因此从技术上说，富文本编辑器并不属于表单。换句话说，富文本编辑器中的 HTML 不会被自动提交给服务器，而需要我们手工来提取并提交 HTML。为此，通常可以添加一个隐藏的表单字段，让它的值等于从 iframe 中提取出的 HTML。具体来说，就是在提交表单之前，从 iframe 中提取出 HTML，并将其插入到隐藏的字段中。

# 第 15 章 使用 Canvas 绘图

## 15.1 基本用法

在使用`<canvas>`前首先要检测`getContext()`方法是否存在。

使用`toDataURL()`方法可以导出在`<canvas>`上绘制的图形。

## 15.2 2D 上下文

### 15.2.5 变换

> 如果你知道将来还要返回某组属性与变换的组合，可以调用 save() 方法。调用这个方法后，当时的所有设置都会进入一个栈结构，得以妥善保管。然后可以对上下文进行其他修改。等想要回到之前保存的设置时，可以调用 restore() 方法，在保存设置的栈结构中向前返回一级，恢复之前的状态。连续调用 save() 可以把更多设置保存到栈结构中，之后再连续调用 restore() 则可以一级一级返回。

    <canvas id="drawing" width=" 200" height="200">A drawing of something.</canvas>
    <script>
    var drawing = document.getElementById("drawing");
    //确定浏览器支持<canvas>元素
    if (drawing.getContext){
        var context = drawing.getContext("2d");
        context.fillStyle = "#ff0000";
        context.save(); //save1
        context.fillStyle = "#00ff00";
        context.translate(100, 100);
        context.save(); //save2
        context.fillStyle = "#0000ff";
        context.fillRect(0, 0, 100, 200); //从点(100,100)开始绘制蓝色矩形
        context.restore(); //返回save2
        context.fillRect(10, 10, 100, 200); //从点(110,110)开始绘制绿色矩形
        context.restore(); //返回save2
        context.fillRect(0, 0, 50, 50); //从点(0,0)开始绘制红色矩形
    }
    </script>

### 15.2.10 使用图像数据

使用`getImageData`可以获取`<canvas>`的[ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)实例（包括图像的宽高和每个像素的信息）。
使用`putImageData()`可以将[ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)实例设置到`<canvas>`。

## 15.3 WebGL

### 15.3.1 类型化数组

WebGL 涉及的复杂计算需要提前知道数值的精度，而标准的 JS 数值无法满足。为此 WebGL 引入了类型化数组。

### 15.3.2 WebGL 上下文

-   视口与坐标：WebGL 中的蛇口坐标和网页坐标不一样，其左下角为原点。
-   着色器：使用 GLSL 语言编写。以字符串的形式传给 WebGL 上下文对象`gl`的`compileShader()`方法进行编译。

> [WebGL: 2D and 3D graphics for the web - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

# 第 16 章 HTML5 脚本编程

## 16.1 跨文档消息传递

> 跨文档消息传送（cross-document messaging），有时候简称为 XDM，指的是在来自不同域的页面间传递消息。例如， www.wrox.com 域中的页面与位于一个内嵌框架中的 p2p.wrox.com 域中的页面通信。在 XDM 机制出现之前，要稳妥地实现这种通信需要花很多工夫。 XDM 把这种机制规范化，让我们能既稳妥又简单地实现跨文档通信。
>
> XDM 的核心是 `postMessage()` 方法。在 HTML5 规范中，除了 XDM 部分之外的其他部分也会提到这个方法名，但都是为了同一个目的：向另一个地方传递数据。对于 XDM 而言， “另一个地方” 指的是包含在当前页面中的`<iframe>`元素，或者由当前页面弹出的窗口。

发送消息：iframe 的 contentWindow 的`postMessage()` 方法

处理消息：window 的`onmessage`事件

## 16.2 原生拖放

拖动某元素时，将依次触发下列事件：

1.  dragstart
2.  drag
3.  dragend

当某个元素被拖动到一个有效的放置目标上时，下列事件会依次发生：

1.  dragenter
2.  dragover
3.  dragleave 或 drop

使用`DragEvent`的`dataTransfer`属性的`setData()`和`getData()`方法可以实现拖放的数据交换。

默认情况下图片、链接文本可以拖动，可以通过设置`draggable`属性为`true`使其他元素可拖动。

```html
<div 
	id="destination" 
	style="width: 200px; height: 200px; background: green;"
	ondrop="alert(event.dataTransfer.getData('text'))"
>destination</div>

<div 
	id="box" 
	style="display: inline; background: lightyellow; cursor: all-scroll;"
	draggable="true"
	ondragstart="event.dataTransfer.setData('text/plain', 'test text')"
>drag me to destination</div>
```

## 16.3 媒体元素

`<video>`和`<audio>`这两个媒体元素都有一个`canPlayType()`方法检测浏览器是否支持某种格式和解码器。

Audio 不用像 Image 那样必须插入到文档中，只要创建一个实例并传入音频即可使用。

## 16.4 历史状态管理

-   使用`history.pushState()`方法增加历史状态
-   用户点击后退后触发`popState`事件

注意：请确保每个`pushState()`创造的假的 URL，服务器上都有一个真的 URL 与之对应， 否侧用户点击刷新会导致 404 错误。

# 第 17 章 错误处理与调试

## 17.2 错误处理

### 17.2.1 try-catch 语句

> ECMA-262 第 3 版引入了 try-catch 语句，作为 JavaScript 中处理异常的一种标准方式。这与 Java 中的 try-catch 语句是完全相同的。

```js
try{
    // 可能会导致错误的代码
} catch(error){
    // 在错误发生时怎么处理
    alert(error.message) // message 属性是唯一一个能够保证所有浏览器都支持的属性
}
```

> 只要代码中包含 finally 子句，则无论 try 或 catch 语句块中包含什么代码——甚至 return 语句，都不会阻止 finally 子句的执行。

```html
<script>
alert(testFinally());// 0
function testFinally(){
    try {
        return 2;// 不执行
        alert('try');// 不执行
    } catch (error){
        return 1;
    } finally {
        return 0;
    }
}
</script>
```

只要代码中包含 finally 子句，无论 try 还是 catch 语句块中的 return 语句都会被忽视。

### 17.2.2 抛出错误

> 与 try-catch 语句相匹配的还有 throw 操作符，用于抛出自定义错误。
>
> 遇到 throw 操作符时代码会立即停止，仅当有 try-catch 语句捕获到抛出的值时，代码才会继续执行。
>
> 利用原型链可以通过继承 Error 来创建自定义错误类型。

### 17.2.3 错误（error）事件

```html
<!-- 图像 -->
<img src="xxx" onerror="console.log('img not loaded')">
<!-- window -->
<script>
	window.onerror = function(message, source, lineno, colno, error) {
		console.log(message);
	}
	throw "test";
</script>
```

[GlobalEventHandlers.onerror - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)

### 17.2.5 常见的错误类型

1.  类型转换错误：注意类型的自动转换引起的错误，尤其是在作为判断条件时
2.  数据类型错误：使用参数和变量前应该保证其类型是正确的（这点利用 TS 可以非常好地解决）
3.  通信错误：对于查询字符串要使用`encodeURIComponent()`处理

### 17.2.6 区分致命错误和非致命错误

非致命错误，可以根据下列一或多个条件来确定：

-   不影响用户的主要任务；
-   只影响页面的一部分；
-   可以恢复；
-   重复相同操作可以消除错误。

eg：非致命错误添加 try-catch 可以使非致命错误发生后后续代码继续执行，后面的模块继续加载

致命错误，可以通过以下一或多个条件来确定：

-   应用程序根本无法继续运行；
-   错误明显影响到了用户的主要操作；
-   会导致其他连带错误。

### 17.2.7 把错误记录到服务器

推荐将 JS 错误写回服务器，把前后端的错误集中起来能够极大地方便对数据的分析。

> 建立这样一种 JavaScript 错误记录系统，首先需要在服务器上创建一个页面（或者一个服务器入口点），用于处理错误数据。这个页面的作用无非就是从查询字符串中取得数据，然后再将数据写入错误日志中。这个页面可能会使用如下所示的函数：

    function logError(sev, msg){
        var img = new Image();
        img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg=" + encodeURIComponent(msg);
    }

> 这个 logError() 函数接收两个参数：表示严重程度的数值或字符串（视所用系统而异）及错误消息。其中，使用了 Image 对象来发送请求，这样做非常灵活，主要表现如下几方面。

-   所有浏览器都支持 Image 对象，包括那些不支持 XMLHttpRequest 对象的浏览器。
-   可以避免跨域限制。通常都是一台服务器要负责处理多台服务器的错误，而这种情况下使用 XMLHttpRequest 是不行的。
-   在记录错误的过程中出问题的概率比较低。大多数 Ajax 通信都是由 JavaScript 库提供的包装函数来处理的，如果库代码本身有问题，而你还在依赖该库记录错误，可想而知，错误消息是不可能得到记录的。

# 第 18 章 JavaScript 与 XML

-   DOMParser 和 XMLSerializer 接口提供的 XML 和 DOM 文档的转换
-   [XPath](https://developer.mozilla.org/en-US/docs/Web/XPath) 查找 XML 节点
-   [XSLT](https://developer.mozilla.org/en-US/docs/Web/XSLT) 转换 XML 文档

# 第 19 章 E4X

E4X 已经废弃了（[E4X - Archive of obsolete content | MDN](https://developer.mozilla.org/en-US/docs/Archive/Web/E4X)），大概看了一下感觉 JSX 和 XML 字面量有点像啊（PS：确实只是有点像，[JSX | XML-like syntax extension to ECMAScript](https://facebook.github.io/jsx/#prior-art)）。

# 第 20 章 JSON

JSON 的语法可以表示以下三种类型的值。

-   简单值：使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null。但 JSON 不支持 JavaScript 中的特殊值 undefined。
-   对象：对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可以是简单值，也可以是复杂数据类型的值。
-   数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。

> 与 JavaScript 的对象字面量相比， JSON 对象有两个地方不一样。首先，没有声明变量（JSON 中没有变量的概念）。其次，没有末尾的分号（因为这不是 JavaScript 语句，所以不需要分号）。再说一遍，对象的属性必须加双引号，这在 JSON 中是必需的。属性的值可以是简单值，也可以是复杂类型值。

## 20.2 序列化和解析

与 XML 数据结构解析成 DOM 文档提取数据很麻烦，而 JSON 解析为 JS 对象提取数据非常简单。

### 20.2.1 JSON 对象

早期 JSON 解析器基本上就是使用 JS 的`eavl()`函数，由于 JSON 是 JS 语法的子集，因此`eavl()`函数可以解析并返回数据。ES5 对即系解析 JSON 的行为进行规范，定义了全局对象 JSON。

JSON 对象有两个方法：`stringify()`和`parse()`。

### 20.2.2 序列化选项

> `JSON.stringify()` 除了要序列化的 JavaScript 对象外，还可以接收另外两个参数，这两个参数用于指定以不同的方式序列化 JavaScript 对象。第一个参数是个过滤器，可以是一个数组，也可以是一个函数；第二个参数是一个选项，表示是否在 JSON 字符串中保留缩进。

可以为对象添加`toJSON()`方法，这个方法会返回自身的 JSON 数据格式。

例如：

```js
var purple = {
    name: "zzz",
    age: 17,
    toJSON() {
        return {
            age: this.age,
            fans: []
        }
    }
};
JSON.stringify(purple, (k, v) => k === "age" ? 99999 : v, 4);
// '{\n    "age": 99999,\n    "fans": []\n}'
```

### 20.2.3 解析选项

> `JSON.parse()`方法也可以接收另一个参数，该参数是一个函数，将在每个键值对上调用。

例如：

```js
var purple = {
    name: "zzz",
    age: 17,
    birthday: new Date(0)
};
var str = JSON.stringify(purple);
var obj = JSON.parse(str, (k, v) => k === "birthday" ? new Date(v) : v);
console.log(obj.birthday.getFullYear());// 1970
```

# 第 21 章 Ajax 与 Comet

## 21.1 XMLHttpRequest 对象

[XMLHttpRequest - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

```javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if (xhr.readyState == 4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
};
xhr.open("GET", "example.txt", true);
xhr.send(null);
```

### 21.1.3 GET 请求

> 查询字符串中每个参数的名称和值必须使用`encodeURIComponent()`进行编码然后放到 URL 的末尾。

1.  使用`open()`方法时第一个参数为 GET（书上是小写，应该是打错了）
2.  构建带查询字符串的 URL

### 21.1.4 POST 请求

> POST 请求应该把数据作为请求主体提交。
>
> POST 请求的主体可以包含非常多的数据，而且格式不限。

1.  使用`open()`方法时第一个参数为 POST（书上是小写，应该是打错了）
2.  使用`send()`方法发送数据

## 21.2 XMLHttpRequest 2 级

### 21.2.1 FormData

[FormData - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

```html
<form>
	<input type="text" name="inp">
	<input type="radio" name="ra" value="male" checked>
	<input type="radio" name="ra" value="famale">
	<select name="sel">
		<option>t1</option>
		<option>t2</option>
	</select>
</form>

<script>
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
	            alert(xhr.responseText);
	        } else {
	            alert("Request was unsuccessful: " + xhr.status);
	        }
	    }
	};
	xhr.open("POST", "example.php");
	xhr.send(new FormData(document.forms[0]));
</script>
```

## 21.3 进度事件

[XMLHttpRequest: progress event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event)

当请求接收到数据这个事件会定期触发。

## 21.4 跨源资源共享

> CORS（Cross-Origin Resource Sharing，跨源资源共享）是 W3C 的一个工作草案，定义了在必须访问跨源资源时，浏览器与服务器应该如何沟通。 CORS 背后的基本思想，就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。
>
> 比如一个简单的使用 GET 或 POST 发送的请求，它没有自定义的头部，而主体内容是 text/plain。在发送该请求时，需要给它附加一个额外的 Origin 头部，其中包含请求页面的源信息（协议、域名和端口），以便服务器根据这个头部信息来决定是否给予响应。下面是 Origin 头部的一个示例：

`Origin: http://www.nczonline.net`

> 如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息（如果是公共资源，可以回发 "\*"）。例如：

`Access-Control-Allow-Origin: http://www.nczonline.net`

> 如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。正常情况下，浏览器会处理请求。注意，请求和响应都不包含 cookie 信息。

浏览器对 CORS 的实现：

> 要请求位于另一个域中的资源，使用标准的 XHR 对象并在`open()`方法中传入绝对 URL 即可：

```js
var xhr = new XMLHttpRequest();
xhr.onload = function(){
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        alert(xhr.responseText);
    } else {
        alert("Request was unsuccessful: " + xhr.status);
    }
};
xhr.open("GET", "http://www.somewhere-else.com");
xhr.send(null);
```

跨越 XHR 的限制：

1.  不能使用[`setRequestHeader()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader)设置自定义请求头
2.  不能发送和接收 cookie
3.  调用[`getAllResponseHeaders()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)总会返回空字符串

### 21.4.3 Preflighted Request

[Preflight request - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)

> 一个 CORS 预检请求是用于检查服务器是否支持 [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS) 即跨域资源共享。
>
> 它一般是用了以下几个 HTTP 请求首部的 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 请求：[`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method) 和 [`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)，以及一个 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 首部。
>
> 当有必要的时候，浏览器会自动发出一个预检请求；所以在正常情况下，前端开发者不需要自己去发这样的请求。

### 21.4.4 带凭据请求

> 默认情况下，跨域请求不提供凭据（cookie，HTTP 认证，及客户端 SSL 证明等）。通过将 withCredentials 设置为 true，可以指定某个请求应该发送凭据。
>
> IE10 及更早版本都不支持！

## 21.5 其他跨域技术

### 21.5.1 图像 Ping

无法处理相应的信息，只能使用 onload 和 onerror 确定是否接收到相应，因此只能用于浏览器与服务器单向通信。

```javascript
var img = new Image();
img.onload = img.onerror = function(){
    alert("Done!");
};
img.src = "http://www.example.com/test?name=Nicholas";
```

### 21.5.2 JSONP

例：通过查询地理定位服务来显示你的 IP 地址和位置信息。（接口已经废弃：[apilayer/freegeoip: IP geolocation web server](https://github.com/apilayer/freegeoip#readme)）

```javascript
function handleResponse(response){
    alert("You’ re at IP address " + response.ip + ", which is in " + response.city + ", " + response.region_name);
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
```

问题：

1.  执行其他域的代码不安全
2.  确定 JSONP 请求是否失败不容易（目前除了 FireFox 和 Chrome，其他浏览器的对 onerror 事件的支持都是未知。[GlobalEventHandlers.onerror - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)）

## Comet

> Ajax 是一种从页面向服务器请求数据的技术，而 Comet 则是一种服务器向页面推送数据的技术。 Comet 能够让信息近乎实时地被推送到页面上，非常适合处理体育比赛的分数和股票报价。

实现方式：

1.  使用长轮询：页面发起请求等待服务器回复，服务器回复后开启发起新请求
2.  使用 HTTP 流：浏览器发送一个请求，服务器保持连接打开，然后周期性地像浏览器发送数据，浏览器通过 readystatechange 事件检测 readyState 是否为 3 就可以利用 HTTP 流。

## SSE 与 Web Sockets

-   [EventSource - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
-   [WebSocket - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

> 面对某个具体的用例，在考虑是使用 SSE 还是使用 Web Sockets 时，可以考虑如下几个因素。
>
> 首先，你是否有自由度建立和维护 Web Sockets 服务器？因为 Web Socket 协议不同于 HTTP，所以现有服务器不能用于 Web Socket 通信。 SSE 倒是通过常规 HTTP 通信，因此现有服务器就可以满足需求。
>
> 第二个要考虑的问题是到底需不需要双向通信。如果用例只需读取服务器数据（如比赛成绩），那么 SSE 比较容易实现。如果用例必须双向通信（如聊天室），那么 Web Sockets 显然更好。别忘了，在不能选择 Web Sockets 的情况下，组合 XHR 和 SSE 也是能实现双向通信的。

## 21.6 安全

> 对于未被授权系统有权访问某个资源的情况，我们称之为 CSRF（Cross-Site Request Forgery，跨站点请求伪造）。

为了确保通过 XHR 访问的 URL 安全，通行的做法就是验证发送请求者是否有权访问相应的资源。有以下方法可供选择：

-   通过 SSL 连接来访问可以通过 XHR 请求的资源
-   每次请求都携带 token

# 第 22 章 高级技巧

## 22.1 高级函数

### 22.1.1 安全类型检测

```js
Object.prototype.toString.call(JSON); // '[object JSON]'
JSON = function(){};
Object.prototype.toString.call(JSON); // '[object Function]'
```

### 22.1.2 作用域安全的构造函数

浏览器控制台运行下面的例子，你会神奇地发现页面居然跳转了（好神奇 =\_=!!!）

```js
function Persion(loc){
    this.location = loc;
}

var zi = Persion('zi');// 不小心忘记使用 new
```

这时您需要用作用域安全的构造函数，然后你会神奇地发现页面又跳转了（好神奇 =\_=!!!）

```js
function Persion(loc){
    if(this instanceof Persion){
        this.location = loc;
    } else {
        return new Persion(loc)
    }
}

var zi = Persion('zi');// 又不小心忘记使用 new
```

使用作用域安全的构造函数后您就必须要用原型链了。

```js
function Persion(loc){
    if(this instanceof Persion){
        this.location = loc;
    } else {
        return new Persion(loc)
    }
}

function ZM(loc){
    Persion.call(this, loc);
   	this.age = 17;
}

ZM.prototype = new Persion(); // 不将原型链连上就无法继承
ZM.prototype.constructor = ZM;

var zi = new ZM('zi');
```

### 22.1.3 惰性载入函数

> 惰性载入表示函数执行的分支仅会发生一次。有两种实现惰性载入的方式
>
> 第一种就是在函数被调用时再处理函数。在第一次调用的过程中，该函数会被覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了。
>
> 第二种实现惰性载入的方式是在声明函数时就指定适当的函数。这样，第一次调用函数时就不会损失性能了，而在代码首次加载时会损失一点性能。

```js
// 第一种方式
function flatArr(arr){
    if(typeof Array.prototype.flat === "function"){
        flatArr = arr => arr.flat();
    }else{
        flatArr = arr => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
            const stack = [...arr];
            const res = [];
            while (stack.length) {
                // pop value from stack
                const next = stack.pop();
                if (Array.isArray(next)) {
                    // push back array items, won't modify the original input
                    stack.push(...next);
                } else {
                    res.push(next);
                }
            }
            //reverse to restore input order
            return res.reverse();
        }
    }
    return flatArr(arr);
}

flatArr([1, 2, 3, [4, 5, 6]]);
```

```js
// 第二种方式
var flatArr = (function(){
    if(typeof Array.prototype.flat === "function"){
        return arr => arr.flat();
    }else{
        return arr => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
            const stack = [...arr];
            const res = [];
            while (stack.length) {
                // pop value from stack
                const next = stack.pop();
                if (Array.isArray(next)) {
                    // push back array items, won't modify the original input
                    stack.push(...next);
                } else {
                    res.push(next);
                }
            }
            //reverse to restore input order
            return res.reverse();
        }
    }
})();

flatArr([1, 2, 3, [4, 5, 6]]);
```

### 22.1.4 函数绑定

> 另一个日益流行的高级技巧叫做函数绑定。函数绑定要创建一个函数，可以在特定的 this 环境中以指定参数调用另一个函数。该技巧常常和回调函数与事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境。

使用函数的`bind()`方法。被绑定函数与普通函数相比需要更多开销，最好只在必要时使用。

```js
var handler = {
    msg: "text",
    handleClick: function(){
        alert(this.msg)
    }
}

// not bind
document.addEventListener('click', handler.handleClick);

// bind
document.addEventListener('click', handler.handleClick.bind(handler));
```

### 22.1.5 函数柯里化

函数柯里化（function currying），用于创建已经设置好一个或多个参数的函数。

```js
function curry(fn, ...args){
    return function(...innerArgs){
        return fn(...args, ...innerArgs);
    }
}
function add(a, b){
    return a + b;
}
var curriedAdd = curry(add, 3);
console.log(curriedAdd(5)); // 8

// 精简版
var add2 = a => b => a + b;
console.log(add2(3)(5)); // 8
```

## 22.2 防篡改对象

注意：一旦将对象定义为防篡改就无法撤销了。

### 22.2.1 不可拓展对象

禁止添加属性。

[Object.preventExtensions() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)

### 22.2.2 密封对象

禁止添加属性，且已有成员的`[[Configurable]]`特性设为为`false`（不能删除和修改访问器属性）。

[Object.seal() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

### 22.2.3 冻结的对象

禁止添加属性，且已有成员的`[[Configurable]]`特性设为为`false`（不能删除和修改访问器属性），且已有成员的`[[[Writable]]`特性设为`false`（如果定义`[[Set]]`函数，访问器依然是可写的)。

[Object.freeze() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

## 22.3 高级定时器

JS 是单线程的，`setTimeout()`和`setInterval()`只是在它们**开始执行后**过了设置的时间，将回调函数添加到事件队列。如果还没有到设置的事件就清除了，这个回调函数就不会添加到事件队列了。

### 22.3.1 重复的定时器

使用`setTimeout()`代替`setInterval()`可以解决`setInterval()`在任务队列已有该回调函数时不会重复添加的问题。

### 22.3.2 Yielding Processes

> 运行在浏览器中的 JavaScript 都被分配了一个确定数量的资源。不同于桌面应用往往能够随意控制他们要的内存大小和处理器时间， JavaScript 被严格限制了，以防止恶意的 Web 程序员把用户的计算机搞挂了。其中一个限制是长时间运行脚本的制约，如果代码运行超过特定的时间或者特定语句数量就不让它继续执行。如果代码达到了这个限制，会弹出一个浏览器错误的对话框，告诉用户某个脚本会用过长的时间执行，询问是允许其继续执行还是停止它。所有 JavaScript 开发人员的目标就是，确保用户永远不会在浏览器中看到这个令人费解的对话框。定时器是绕开此限制的方法之一。

不需同步和按顺序完成的循环可以使用定时器进行分割，这时一种叫数组分块（array chunking）的技术。

```js
function chunk(arr, process, context){
    setTimeout(function(){
        let item = arr.shift();
        process.call(context, item);
        if(arr.length){
            setTimeout(arguments.callee, 100)
        }
    }, 100)
}
chunk([1, 2, 3], d => console.log(d));
```

### 22.3.3 函数节流（throttle）和防反弹 (debounce)

> 浏览器中某些计算和处理要比其他的昂贵很多。例如， DOM 操作比起非 DOM 交互需要更多的内存和 CPU 时间。连续尝试进行过多的 DOM 相关操作可能会导致浏览器挂起，有时候甚至会崩溃。尤其在 IE 中使用 onresize 事件处理程序的时候容易发生，当调整浏览器大小的时候，该事件会连续触发。在 onresize 事件处理程序内部如果尝试进行 DOM 操作，其高频率的更改可能会让浏览器崩溃。为了绕开这个问题，你可以使用定时器对该函数进行节流。
>
> 函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行。第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有任何意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段时间之后才执行。

[Underscore.js - throttle](https://underscorejs.org/#throttle)

[Underscore.js - debounce](https://underscorejs.org/#debounce)

```js
function throttle(callback){
    let timeoutID;
    function wrapper () {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(callback, 1000);
    }
    return wrapper;
}

function debounce(callback){
    let lastExec = 0;
    function wrapper () {
        if(Date.now() - lastExec > 1000){
            lastExec = Date.now();
            setTimeout(callback, 1000);
        }
    }
    return wrapper;
}

var resizeThrottle = throttle(() => console.log('throttle'));
var resizeDebounce = debounce(() => console.log('debounce'));

window.onscroll = () => {
    resizeThrottle();
    resizeDebounce();
}
```

## 22.4 自定义事件

> 事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。对象可以发布事件，用来表示在该对象生命周期中某个有趣的时刻到了。然后其他对象可以观察该对象，等待这些有趣的时刻到来并通过运行代码来响应。
>
> 观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。该模式的一个关键概念是主体并不知道观察者的任何事情，也就是说它可以独自存在并正常运作即使观察者不存在。从另一方面来说，观察者知道主体并能注册事件的回调函数（事件处理程序）。涉及 DOM 上时， DOM 元素便是主体，你的事件处理代码便是观察者。

[EventTarget - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

```js
function EventTarget(){
  this.handlers = {};
}
EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function(type, handler){
    if (typeof this.handlers[type] == "undefined"){
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  },
  fire: function(event){
    if (!event.target){
      event.target = this;
    }
    if (this.handlers[event.type] instanceof Array){
      var handlers = this.handlers[event.type];
      for (var i=0, len=handlers.length; i < len; i++){
        handlers[i](event);
      }
    }
  },
  removeHandler: function(type, handler){
    if (this.handlers[type] instanceof Array){
      var handlers = this.handlers[type];
      for (var i=0, len=handlers.length; i < len; i++){
        if (handlers[i] === handler){
          break;
        }
      }
      handlers.splice(i, 1);
    }
  }
};

function handleMessage(event){
  alert("Message received: " + event.message);
}
//创建一个新对象
var target = new EventTarget();
//添加一个事件处理程序
target.addHandler("message", handleMessage);
//触发事件
target.fire({ type: "message", message: "Hello world!"});
//删除事件处理程序
target.removeHandler("message", handleMessage);
//再次，应没有处理程序
target.fire({ type: "message", message: "Hello world!"});
```

## 22.5 拖放

使用 [DragEvent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) 或者使用鼠标事件进行模拟。

# 第 23 章 离线应用与客户端存储

支持离线 Web 应用开发是 HTML5 的另一个重点。

开发离线 Web 应用：

1.  检测设备是否可以上网
2.  能访问资源（图片、CSS、JS 等）
3.  本地空间用于保存数据

## 23.1 离线检测

通过`navigator.onLine`属性检测是否离线。

在线离线状态切换时会触发 window 的 online 和 offline 事件。

## 23.2 应用缓存（application cache）

使用描述文件（manifest file）例如出要下载和缓存的资源。

可以在`<html>`标签的 manifest 属性中指定这个文件的路径，例如`<html mainfest="/offline.manifest">`。

## 23.3 数据存储

### 23.3.1 Cookie

[cookies.Cookie - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies/Cookie)

1.  限制：50 个以内，总长度 4095B 以内
2.  构成：名称、值域、路径、失效时间、安全标志、只供 HTTP 使用等
3.  子 cookie：使用一个 cookie 的值存过个键值对儿

### 23.3.3 Web 存储机制

[Storage - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)

1.  sessionStorage 对象：存储页面关闭，同会话共享（新标签或窗口中打开页面会创建新的会话）
2.  localStorage 对象：永久存储，同域共享

### 23.3.4 IndexedDB

IndexedDB 是一个数据库，和 MySQL 等数据库类似。

IndexedDB 最大的特点是使用对象保存数据，而不是表来保存数据。（和 MongoDB 有点像）

一个 IndexedDB 数据库，就是一组位于相同命名空间下的对象的集合。

[IndexedDB API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

留坑。。

# 第 24 章 最佳实践

## 24.1 可维护性

编写可维护的代码很重要，因为大部分开发人员都花费大量时间维护他人代码。

### 24.1.1 可维护的代码的特征

-   可理解性
-   直观性
-   可适应性
-   可扩展性
-   可调试性

### 24.1.2 代码约定

1.  可读性：一般要在函数和方法、大段代码、复杂的算法、Hack 这些地方加上注释
2.  变量和函数名：变量应为名词，函数名应该以动词开头（返回布尔类型值得函数一般以 is 开头）
3.  变量类型透明：使用[TypeScript](https://www.typescriptlang.org/)或[匈牙利标记法](https://baike.baidu.com/item/%E5%8C%88%E7%89%99%E5%88%A9%E6%A0%87%E8%AE%B0%E6%B3%95/3640316?fr=aladdin)等方法。

### 24.1.3 松散耦合

1.  解耦 HTML/JS：不要混这写，比如：如果使用 JSX 就尽量不要直接操作 DOM，如果直接操作 DOM 就尽量不要使用 JS 生成 HTML 标签。
2.  解耦 CSS/JS：尽量不用 JS 直接改 CSS，而是通过修改 class 间接修改样式。
3.  解耦应用逻辑 / 事件处理程序：事件处理程序应处理事件、然后将数据转交给应用逻辑处理。

### 24.1.4 编程实践

1.  尊重对象所有权：也许是企业环境中总重要的实践。
    -   不要为实例或原型添加属性和方法。
    -   不要重定义已经存在的方法。
2.  避免全局量：使用命名空间，虽然使用命名空间需要多写一些代码，但命名空间有助于确保代码和页面的其他代码以无害的方式一起工作。
3.  使用常量：以下情况可以考虑使用常量。
    -   重复值：多处用到的值应抽取为常量，包括 CSS 类名等。
    -   用户界面字符串：方便国际化。
    -   URLs：Web 应用中资源位置很容易变，推荐用一个公共的地方存 URL。
    -   任意可能会更改的值：当您用到字面量时，先考虑一下这个值在未来是不是会变化，如果会变化就应该提取出来作为常量。

## 24.2 性能

### 24.2.1 注意作用域

1.  避免全局查找：将在一个函数中多次用到的全局对象存储为局部变量总是没错的。
2.  避免 with 语句：with 会创建自己的作用域链，会增加其中执行的代码的作用域链长度。

### 24.2.2 选择正确的方法

数据量大的循环可以考虑：[Duff's device](https://en.wikipedia.org/wiki/Duff%27s_device)

### 24.2.4 优化 DOM 交互

1.  最小化现场更新：通过文档片段（fragment）将 DOM 一起更新。

    > 一旦你需要访问的 DOM 部分是已经显示的页面的一部分，那么你就是在进行一个现场更新。之所以叫现场更新，是因为需要立即（现场）对页面对用户的显示进行更新。每一个更改，不管是插入单个字符，还是移除整个片段，都有一个性能惩罚，因为浏览器要重新计算无数尺寸以进行更新。现场更新进行得越多，代码完成执行所花的时间就越长；完成一个操作所需的现场更新越少，代码就越快。

2.  使用 innerHTML：对于大量 DOM 更改，innerHTML 比 DOM 方法快。

    > 有两种在页面上创建 DOM 节点的方法：使用诸如 createElement() 和 appendChild() 之类的 DOM 方法，以及使用 innerHTML。对于小的 DOM 更改而言，两种方法效率都差不多。然而，对于大的 DOM 更改，使用 innerHTML 要比使用标准 DOM 方法创建同样的 DOM 结构快得多。

3.  使用事件代理：将事件处理程序附加到更高层的地方负责多个目标的事件处理。

    > 大多数 Web 应用在用户交互上大量用到事件处理程序。页面上的事件处理程序的数量和页面响应用户交互的速度之间有个负相关。为了减轻这种惩罚，最好使用事件代理。

4.  注意 HTMLCollection

    > HTMLCollection 对象的陷阱已经在本书中讨论过了，因为它们对于 Web 应用的性能而言是巨大的损害。记住，任何时候要访问 HTMLCollection，不管它是一个属性还是一个方法，都是在文档上进行一个查询，这个查询开销很昂贵。最小化访问 HTMLCollection 的次数可以极大地改进脚本的性能。

## 24.3 部署

### 24.3.1 构建过程

软件开发典型模式：写代码 -> 编译 -> 测试

JS 是非编译型语言，模式变成：写代码 -> （语法转换） -> 测试

现在通常是使用 ES6 和更新的语法，一些语法测试和生产环境还不支持，需要用进行语法转换（一般使用 [Babe](https://babeljs.io/)）。

### 24.3.2 验证

XXLint（常见的有 JSLint、TSLint、ESLint） 可以查找代码中的语法错误以及常见的编码错误。

### 24.3.3 压缩

> 当谈及 JavaScript 文件压缩，其实在讨论两个东西：代码长度和配重（Wire weight）。代码长度指的是浏览器所需解析的字节数，配重指的是实际从服务器传送到浏览器的字节数。在 Web 开发的早期，这两个数字几乎是一样的，因为从服务器端到客户端原封不动地传递了源文件。而在今天的 Web 上，这两者很少相等，实际上也不应相等。

1.  文件压缩：删除额外的空白、删除注释、缩短变量名等
2.  HTTP 压缩

    > 配重指的是实际从服务器传送到浏览器的字节数。因为现在的服务器和浏览器都有压缩功能，这个字节数不一定和代码长度一样。所有的五大 Web 浏览器（IE、 Firefox、 Safari、 Chrome 和 Opera）都支持对所接收的资源进行客户端解压缩。这样服务器端就可以使用服务器端相关功能来压缩 JavaScript 文件。一个指定了文件使用了给定格式进行了压缩的 HTTP 头包含在了服务器响应中。接着浏览器会查看该 HTTP 头确定文件是否已被压缩，然后使用合适的格式进行解压缩。结果是和原来的代码量相比在网络中传递的字节数量大大减少了。

# 第 25 章 新兴的 API

## 25.1 [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

```html
<style>
  div {
    width: 200px;
    height: 20px;
  }
  #bar {
    border: 1px solid #000;
    position: relative;
	background-color: #666;
	overflow: hidden;
  }
  #progress {
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
  }
</style>

<div id="bar">
  <div id="progress"></div>
</div>

<script>
  var start = null;
  var element = document.getElementById("progress");
  element.style.position = "absolute";

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.left = Math.min(progress / 10, 200) + "px";
    if (progress < 2000) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
</script>
```

## 25.2 Page Visibility API

> 不知道用户是不是正在与页面交互，这是困扰广大 Web 开发人员的一个主要问题。如果页面最小化了或者隐藏在了其他标签页后面，那么有些功能是可以停下来的，比如轮询服务器或者某些动画效果。而 Page Visibility API（页面可见性 API）就是为了让开发人员知道页面是否对用户可见而推出的。

-   `document.hidden`：页面是否隐藏
-   `document.visibilityState`：表示当前页面的可视状态

## 25.3 Geolocation API

> 地理定位（geolocation）是最令人兴奋，而且得到了广泛支持的一个新 API。 通过这套 API， JavaScript 代码能够访问到用户的当前位置信息。当然，访问之前必须得到用户的明确许可，即同意在页面中共享其位置信息。如果页面尝试访问地理定位信息，浏览器就会显示一个对话框，请求用户许可共享其位置信息。

使用`navigator.geolocation`对象

## 25.4 File API

> 不能直接访问用户计算机中的文件，一直都是 Web 应用开发中的一大障碍。 2000 年以前，处理文件的唯一方式就是在表单中加入`<input type="file">`字段，仅此而已。 File API（文件 API）的宗旨是为 Web 开发人员提供一种安全的方式，以便在客户端访问用户计算机中的文件，并更好地对这些文件执行操作。支持 File API 的浏览器有 IE10+、 Firefox 4+、 Safari 5.0.5+、 Opera 11.1 + 和 Chrome。

HTML5 在 DOM 中为文件输入元素添加了一个 files 集合，里面包含着一组带有文件信息的 File 对象。

### 25.4.1 FileReader

> FileReader 类型实现的是一种异步文件读取机制。可以把 FileReader 想象成 XMLHttpRequest，区别只是它读取的是文件系统，而不是远程服务器。

### 25.4.2 读取部分内容

调用 blob 的 slice() 方法返回一个 Blob 实例，然后使用 FileReader 读取这个 Blob 实例。

只读文件的一部分可以节省时间，适合只关注文件特定部分的情况。

### 25.4.3 对象 URL

> 对象 URL 也被称为 blob URL，指的是引用保存在 File 或 Blob 中数据的 URL。使用对象 URL 的好处是可以不必把文件内容读取到 JavaScript 中而直接使用文件内容。为此，只要在需要文件内容的地方提供对象 URL 即可。要创建对象 URL，可以使用`window.URL.createObjectURL()`方法，并传入 File 或 Blob 对象。

注意：要在不需要某个对象 URL 是手动释放内存。

### 25.4.4 读取拖放的内容

`通过 event.dataTransfer.files`获取文件信息。

### 25.4.5 使用 XHR 上传文件

可以使用 File API 读取文件内容然后 post 给后端（这样后端收到的是问价的内容，还要再将她们保存），但更方便的做法是以提交表单的方式上传文件（这样后端就像接收到常规表单一样处理就行）：

1.  创建 21 章介绍的 FormData 的对象
2.  调用 FormData 对象的`append()`方法添加文件
3.  调用 XHR 对象的`send()`方法发送 FormData 对象

## 25.5 Web 计时

[Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance)：用于查看页面加载的各个阶段的时间（13 位的时间戳，精确到毫秒）

## 25.6 Web Workers

> 随着 Web 应用复杂性的与日俱增，越来越复杂的计算在所难免。长时间运行的 JavaScript 进程会导致浏览器冻结用户界面，让人感觉屏幕 “冻结” 了。 Web Workers 规范通过让 JavaScript 在后台运行解决了这个问题。浏览器实现 Web Workers 规范的方式有很多种，可以使用线程、后台进程或者运行在其他处理器核心上的进程，等等。具体的实现细节其实没有那么重要，重要的是开发人员现在可以放心地运行 JavaScript，而不必担心会影响用户体验了。

非常消耗时间的操作转交给 Worker 就不会阻塞用户界面了，例如：使用 Worker 排序数组 [web worker example - CodeSandbox](https://codesandbox.io/s/j7kz56w61v)。

Worker 可以使用`importScripts()`方法导入其他脚本。

Worker 分为专用 Worker（dedicated worker）和共享 Worker（shared worker），前者不能在页面间共享，后者可以在多个窗口，iframe 或 Worker 间共享。

# 附录 A ECMAScript Harmony

书中好多特性（例如，迭代器对象、数组领悟等）都没有纳入 ES6 标准。

## 代理对象

**Proxy** 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

另一种描述：**Proxy** 对象可以处理（捕捉）原生功能，并用自己的函数处理。

## 映射与集合

用普通对象保存键值对融合与原生属性混淆，使用`Map`类型可以避免混淆。

`WeakMap`是 ES 中唯一一个能够让你知道对象什么时候已经完全解除引用的类型。例：Babel 将类的私用属性转换为 WeakMap，这样私有属性就不会强引用实例化的对象（强引用实例化的对象会导致对象内存无法释放）。

```javascript
class Test {
  #t1 = 500
  #t2 = 600
}

// 转换后
var Test = function Test() {
  _classCallCheck(this, Test);

  _t.set(this, {
    writable: true,
    value: 500
  });

  _t2.set(this, {
    writable: true,
    value: 600
  });
};

var _t = new WeakMap();

var _t2 = new WeakMap();
```

# 附录 B 严格模式

## 变量

严格模式下不允许：

1.  意外创建全局变量
2.  对变量使用`delete`操作符
3.  不能使用保留字作为变量名

## 对象

严格模式下错误地操作对象更容易报错（如，为只读属性赋值等）。

## 函数

严格模式下不能使用`arguments.caller`和`arguments.callee`

## 抑制`this`

非严格模式下使用函数的`call()`和`apply()`方法时`null`和`undefined`会转为为全局对象（这非常危险）。

严格模式下`this`就是制定的值

```javascript
function C1(a){
    this.val1 = a;
}
C1.call(null, 123);// globalThis.val1 变为 123

function C2(a){
    "use strict"
    this.val2 = a;
}
C.call(null, 456);// 报错
```

# 附录 C JavaScript 库

## 通用库

## 互联网应用

## 动画和特效

# 附录 D JavaScript 工具

## 校验器

## 模块打包

## 语法转换

## 单元测试

## 压缩器

## 文档生成器

## （安全执行环境？）

ADsafe 和 Caja
