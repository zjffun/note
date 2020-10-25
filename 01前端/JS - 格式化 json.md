# 一 使用原生 JSON.stringify 实现

```
<textarea name="" id="myTA" cols="30" rows="10"></textarea>
<script>
    var myTA = document.getElementById("myTA");
    myTA.value = JSON.stringify({"aaa":123,"bbb":456}, null, 4)
</script>
```

# 二 自己写函数实现

> <https://jsfiddle.net/q2gnX/>

[在线预览](http://jsfiddle.net/1010543618/zgsk5vu8/)

```js
// Notes:
// - json2.js is not needed if browser supports JSON.stringify and JSON.parse natively
// - jQuery is only used to place the results
// colon；冒号，pad；填补
var formatJson = function(json, options) {
  var reg = null,
    formatted = "",
    pad = 0,
    PADDING = "    "; // one can also use '\t' or a different number of spaces

  // optional settings
  options = options || {};
  // remove newline where '{' or '[' follows ':'
  options.newlineAfterColonIfBeforeBraceOrBracket =
    options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
  // use a space after a colon
  options.spaceAfterColon = options.spaceAfterColon === false ? false : true;

  // begin formatting...

  // make sure we start with the JSON as a string
  if (typeof json !== "string") {
    json = JSON.stringify(json);
  }
  // parse and stringify in order to remove extra whitespace
  // json = JSON.stringify(JSON.parse(json));可以除去多余的空格
  json = JSON.parse(json);
  json = JSON.stringify(json);

  // add newline before and after curly braces
  reg = /([\{\}])/g;
  json = json.replace(reg, "\r\n$1\r\n");

  // add newline before and after square brackets
  reg = /([\[\]])/g;
  json = json.replace(reg, "\r\n$1\r\n");

  // add newline after comma
  reg = /(\,)/g;
  json = json.replace(reg, "$1\r\n");

  // remove multiple newlines
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, "\r\n");

  // remove newlines before commas
  reg = /\r\n\,/g;
  json = json.replace(reg, ",");

  // optional formatting...
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ":{");
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ":[");
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ": ");
  }

  $.each(json.split("\r\n"), function(index, node) {
    var i = 0,
      indent = 0,
      padding = "";

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }

    formatted += padding + node + "\r\n";
    pad += indent;
  });

  return formatted;
};

var json = {};

// display formatted JSON (as JSON object)
json = {
  a: {
    aa: [
      1,
      2,
      { aaa: "abc", bbb: "defgh", ccc: 987 },
      [100, 200, 300, { one: 1, two: "ii", three: "Three" }, 1000]
    ],
    bb: "xyz",
    ccc: 777
  },
  b: ["qqq", "www", "eee"],
  c: "hello",
  d: 12345
};
$("#formattedJson1").text(formatJson(json));

// display formatted JSON (from JSON string)
json =
  '{       "a": {         "aa": [             1,            2,            {                 "aaa": "abc",' +
  '                 "bbb": "defgh",                 "ccc": 987             },             [       100,       ' +
  '200,                     300             ,            { "one": 1, "two"  : "ii", "three"  ' +
  ': "Three" }, 1000 ]' +
  "         ],         " +
  '            "bb":         "xyz",         "ccc": 777     },     "b": [ "qqq", "www", ' +
  '"eee" ],     "c": "hello",     "d": 12345 }';
$("#formattedJson2").text(formatJson(json));
```
