感觉原型真是 JS 中非常复杂的一环。看 MDN 的文档某些地方也不是写的很清楚，下面写一些我对于原型的理解，如有错误望大家指出。

感觉`prototype`和`[[Prototype]]`挺容易混的，看 ES 的文档时也是在看到`prototype.constructor`时很蒙。

根据我的经验`prototype`一般只有构造函数（函数）有，毕竟她可以创建对象（实例），其他对象，数组，字符串什么的没有必要有她。

所有的的对象都有自己的原型链（`[[Prototype]]`），

她会继承（指向）其构造函数的`prototype`，

她的构造函数的`[[Prototype]]`会继承（指向）其构造函数的`prototype`，

她的构造函数的`[[Prototype]]`会继承（指向）其构造函数的`prototype`，

她的构造函数的`[[Prototype]]`会继承（指向）其构造函数的`prototype`,

她的构造函数的`[[Prototype]]`会继承（指向）其构造函数的`prototype`，

。。。

最终指向 null 结束。

这样就和类一样了。

# `prototype`

对象的`prototype` 属性表示她的原型，该属性里面包含着可以被 “继承” 的属性。（一般只有函数自带个属性）

```javascript
var foo = function(){}
foo.prototype.bar = 666;

// foo对象
// {
//     ...
//     prototype: {
//         ...
//         bar: 666
//     }
// }
```

## `prototype.constructor`

对象的`prototype` 属性里面有个特殊的属性`constructor` ，她是指向该对象的指针（这里可能有误 T_T ）。（一般只有函数自带个属性）

```javascript
var foo = function(){}
foo.prototype.bar = 666;

// foo对象
// {
//     ...
//     prototype: {
//         ...
//         constructor: foo,
//         bar: 666
//     }
// }
```

## `prototype.[[Prototype]]`

对象的`prototype` 属性里面还有个特殊的 "属性"`[[Prototype]]` ，可以用来模拟继承，她指向该对象的`prototype` 属性的继承下来的原型（指向该对象继承的原型的`prototype`属性的指针）。

# `[[Prototype]]` 也叫 `prototype.__proto__`

对象的构造函数的原型（指向创建该对象的函数的`prototype`属性的指针）。（一切对象都有这个虚拟指针）

[Object.prototype.**proto** - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

## `[[Prototype]].constructor`

对象的构造函数的原型的构造器（指向创建该对象的函数的`prototype`属性中的`constructor`属性的指针）。（一切对象都有这个虚拟指针）

# 关系对比

```javascript
// Person
var Person = function (name) {
    this.name = name;
    this.canTalk = true;
};

Person.prototype.greet = function () {
    if (this.canTalk) {
        console.log('Hi, I am ' + this.name);
    }
};

// Employee
var Employee = function (name, title) {
    Person.call(this, name);
    this.title = title;
};

// subclass extends superclass
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.greet = function () {
    if (this.canTalk) {
        console.log('Hi, I am ' + this.name + ', the ' + this.title);
    }
};

// instantiation
var joe = new Person('Joe');
var bob = new Employee('Bob', 'Builder');
// call function
joe.greet();
bob.greet();

// 直接打印
console.log(Person, Employee, joe, bob)
// prototype：当前对象的原型对象（实例 joe 和 bob 没有prototype）
console.log(Person.prototype, Employee.prototype, joe.prototype, bob.prototype)
// __proto__：返回当前对象构造函数的原型（代表的是 Obj.[[Prototype]]）
console.log(Person.__proto__, Employee.__proto__, joe.__proto__, bob.__proto__)
// constructor：返回当前对象构造函数的引用（代表的是 Obj.[[Prototype]].constructor）
console.log(Person.constructor, Employee.constructor, joe.constructor, bob.constructor)
```
