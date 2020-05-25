Pascal case is a subset of Camel Case where the first letter is capitalized.

```js
function c2k(str) {
  return (str[0] + str.substring(1).replace(/[A-Z]/g, "-$&")).toLowerCase();
}

console.log(c2k("camelCase")); //camel-case
console.log(c2k("PascalCase")); //pascal-case
console.log(c2k("VChart")); //v-chart
console.log(c2k("SSSSG")); //s-s-s-s-g
```
