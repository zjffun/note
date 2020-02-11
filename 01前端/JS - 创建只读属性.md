# 一：为私有变量创建`get()`方法

这种方式可以创建 “伪” 只读属性。这并不是一种好方法，因为使用_函数_获得只读的_属性_不太符合一般的逻辑。

```js
/**
 * Represent a used car.
 *
 * @constructor
 */
function Car() {
  var SELF = this,
    odometer = 0;

  /**
   * Increment the odometer
   *
   * @param {Number} miles
   */
  SELF.drive = function(miles) {
    odometer += Math.abs(miles);
  };

  /**
   * Get a protected odometer reading
   *
   * @return {Number}
   */
  SELF.get_odometer = function() {
    return odometer;
  };
}

var subaru = new Car();
subaru.drive(500);
subaru.get_odometer(); // 500
```

# 二：使用`Object.defineProperties`

使用 ECMAScript 5 的新特性灵活地定义变量。

```js
/**
 * Represent a used car.
 *
 * @constructor
 */
function Car() {
  var SELF = this,
    _odometer = 0;

  /**
   * Increment the odometer
   *
   * @param {Number} miles
   */
  SELF.drive = function(miles) {
    _odometer += Math.abs(miles);
  };

  /**
   * Get a protected odometer reading
   *
   * @return {Number}
   */
  Object.defineProperties(this, {
    odometer: {
      get: function() {
        return _odometer;
      }
    }
  });
}

var subaru = new Car();
subaru.drive(500);
subaru.odometer; // 500
subaru.odometer = 0; // does nothing
subaru.odometer; // 500
```

# 三：使用新语法

虽然类是 function 的语法糖，但定义类时无法像 function 一样定义私有变量（constructor 中定义的变量都是公有变量），所以这里需要用到用到类字段声明。

类字段声明是 TC39 提出的新语法，现在只进行到阶段 3 候选阶段（到阶段 4 完成这个语法才算是准备好将包括在 ES 规范中），所以下面的代码需要用 Babel 转换成旧语法才可以使用。

```js
/**
 * Represent a used car.
 *
 * @constructor
 */
class Car {
  #odometer = 500;
  get odometer() {
    return this.#odometer;
  }
}

var subaru = new Car();
subaru.odometer; // 500
subaru.odometer = 0; // TypeError: Cannot set property odometer of #<Car> which has only a getter
```

通过分析转换为 ES5 的源码可以看出，其实`get`方法本质还是使用了`Object.defineProperty`，私有变量使用了`WeekMap`进行存储。

```js
// Babel 转换后的代码
"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  var descriptor = privateMap.get(receiver);
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

var Car =
  /*#__PURE__*/
  (function() {
    function Car() {
      _classCallCheck(this, Car);

      _odometer.set(this, {
        writable: true,
        value: 500
      });
    }

    _createClass(Car, [
      {
        key: "odometer",
        get: function get() {
          return _classPrivateFieldGet(this, _odometer);
        }
      }
    ]);

    return Car;
  })();

var _odometer = new WeakMap();

var subaru = new Car();
subaru.odometer; // 500
subaru.odometer = 0; // TypeError: Cannot set property odometer of #<Car> which has only a getter
```

# 参考

-   [JavaScript: Read Only Attributes](https://ttmm.io/tech/javascript-read-attributes/)
-   [1. The TC39 process for ECMAScript features](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)
