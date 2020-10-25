JS 使用 IEEE 754 的双精度数表示数字，1 位符号，10 位指数，53 位底数。

所以 JS 数字精度近似为 15.95 位 10 进制（`10 ** 15.95`）。

也就是说整部加小数部分超过 15 位再用 Number 类型就不合适了，可以使用 JS 的[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)类型，也可以使用[peterolson/BigInteger.js](https://github.com/peterolson/BigInteger.js)、[rauschma/strint](https://github.com/rauschma/strint)（有 bug，代码少可以用来学习）等库用字符串进行计算。

注：准确来说精度是`2 ** 53 = 9007199254740992`（可以使用`Number.MAX_SAFE_INTEGER`检查），超过这个值计算出来的数据就不准了，例如：

```text
> 2 ** 53
9007199254740992
> 2 ** 53 + 1
9007199254740992(false)
> 2 ** 53 + 2
9007199254740994(true)
> 2 ** 53 + 3
9007199254740996(false)

// PS: 使用 BigInt
> 2n ** 53n + 1n
9007199254740993n(true)
> 2n ** 53n + 2n
9007199254740994n(true)
> 2n ** 53n + 3n
9007199254740995n(true)
> (2n ** 53n + 3n).toString()
'9007199254740995'

// Number.MAX_SAFE_INTEGER
Number.MAX_SAFE_INTEGER == 2**53 - 1
```

wiki 上的《IEEE 754 基本交换格式表》，binary64 就是 JS 中用的

| Name                                                                             | Common name      | Base | Significand Bits/Digits | Decimal digits | Exponent bits | Decimal E max | Exponent bias | E min | E max | Notes     |
| -------------------------------------------------------------------------------- | ---------------- | ---- | ----------------------- | -------------- | ------------- | ------------- | ------------- | ----- | ----- | --------- |
| [binary16](https://en.wikipedia.org/wiki/Half-precision_floating-point_format)   | Half precision   | 2    | 11                      | 3.31           | 5             | 4.51          | 24−1 = 15     | −14   | +15   | not basic |
| [binary32](https://en.wikipedia.org/wiki/Single-precision_floating-point_format) | Single precision | 2    | 24                      | 7.22           | 8             | 38.23         | 27−1 = 127    | −126  | +127  |           |
| [binary64](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) | Double precision | 2    | 53                      | 15.95          | 11            | 307.95        | 210−1 = 1023  | −1022 | +1023 |           |

参考：

> -   [Working with large integers in JavaScript](http://2ality.com/2012/07/large-integers.html)
> -   [IEEE 754 - Wikipedia](https://en.wikipedia.org/wiki/IEEE\_754#Representation_and_encoding_in_memory)
