> 生成器函数在执行时能暂停，后面又能从暂停处继续执行。
>
> 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器（iterator ）对象。当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现 yield 的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 yield\*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
>
> next() 方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回。
>
> 调用 next() 方法时，如果传入了参数，那么这个参数会作为上一条执行的  yield 语句的返回值
>
> 当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，即调用 next() 方法返回的对象的 done 为 true。如果 return 后面跟了一个值，那么这个值会作为当前调用 next() 方法返回的 value 值。

# 基本使用

    // 生成器函数定义
    function* countAppleSales () {
      var saleList = [3, 7, 5];
      for (var i = 0; i < saleList.length; i++) {
        yield saleList[i];
      }
    }

    // 通过构造一个迭代器来使用它。
    var appleStore = countAppleSales(); // Generator { }
    console.log(appleStore.next()); // { value: 3, done: false }
    console.log(appleStore.next()); // { value: 7, done: false }
    console.log(appleStore.next()); // { value: 5, done: false }
    console.log(appleStore.next()); // { value: undefined, done: true }

    // next方法传入参数

    function *gen(){
        y=yield 'foo';
        yield y;
    }

    var gen_obj=gen();
    console.log(gen_obj.next());// 执行 yield 'foo'，返回 'foo'
    console.log(gen_obj.next(10));// 将 10 赋给上一条 yield 'foo' 的左值，即执行 y=10，返回 10
    console.log(gen_obj.next());// 执行完毕，value 为 undefined，done 为 true

# 放 babel 里处理一下？

    "use strict";

    var _marked = /*#__PURE__*/regeneratorRuntime.mark(countAppleSales);

    function countAppleSales() {
      var saleList, i;
      return regeneratorRuntime.wrap(function countAppleSales$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              saleList = [3, 7, 5];
              i = 0;

            case 2:
              if (!(i < saleList.length)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return saleList[i];

            case 5:
              i++;
              _context.next = 2;
              break;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _marked, this);
    }

    'use strict';

    var _marked = /*#__PURE__*/regeneratorRuntime.mark(gen);

    function gen() {
        return regeneratorRuntime.wrap(function gen$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return 'foo';

                    case 2:
                        y = _context.sent;
                        _context.next = 5;
                        return y;

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this);
    }

# 参考

> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*>
>
> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield>
