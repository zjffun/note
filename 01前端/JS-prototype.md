# prototype
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype

Object.prototype 属性表示 Object 的原型对象。

# prototype.\_\_proto\_\_
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto

Object.prototype 的 \_\_proto\_\_  属性是一个访问器属性（一个getter函数和一个setter函数）, 暴露了通过它访问的对象的内部[[Prototype]] (一个对象或 null)。

# prototype.constructor
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor

返回创建实例对象的 Object 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。对原始类型来说，如1，true和"test"，该值只可读。


```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script>
    // Person
    var Person = function(name) {
      this.name = name;
      this.canTalk = true;
    };

    Person.prototype.greet = function() {
      if (this.canTalk) {
        console.log('Hi, I am ' + this.name);
      }
    };

    // Employee
    var Employee = function(name, title) {
      Person.call(this, name);
      this.title = title;
    };

    Employee.prototype = Object.create(Person.prototype);
    Employee.prototype.constructor = Employee;

    Employee.prototype.greet = function() {
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
    console.log(Person, Employee, joe , bob)
    // prototype：当前对象的原型对象
    console.log(Person.prototype, Employee.prototype, joe.prototype, bob.prototype)
    // constructor：返回当前对象构造函数的引用
    console.log(Person.constructor, Employee.constructor, joe.constructor , bob.constructor)
    // __proto__：返回当前对象构造函数的原型
    console.log(Person.__proto__, Employee.__proto__, joe.__proto__, bob.__proto__)
    console.log(Person.constructor.prototype, Employee.constructor.prototype, joe.constructor.prototype, bob.constructor.prototype)
  </script>
  <script>
    
  </script>
</body>
</html>
```


