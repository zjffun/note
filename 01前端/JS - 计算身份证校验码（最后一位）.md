# [在线预览](https://jsfiddle.net/1010543618/ck2eoaae/)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    #msg{
      color: red;
    }
  </style>
</head>
<body>
  身份证号：<input id="id-card" type="text">（前17位）<br>
  （校验位）最后一位为：<span id="msg"></span><span id="check-digit"></span><br>
  <button onclick="calculate()">计算</button><br>
  <script>
    "use strict";
    // 前17位每项的系数
    let coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 除11取余的结果对应的校验位（最后一位）的值
    let checkDigitMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    function calculate(){
      var idCard = document.querySelector("#id-card");
      var checkDigit = document.querySelector("#check-digit");
      var msg = document.querySelector("#msg");
      var sum = 0;
      checkDigit.innerHTML = msg.innerHTML = "";
      if(idCard.value.length < 17){
        msg.innerHTML = "至少输入身份证前17位";
        return
      }
      for (var i = 0; i < 17; i++) {
        sum += idCard.value[i] * coefficient[i];
      }
      checkDigit.innerHTML = checkDigitMap[sum % 11];
    }
  </script>
</body>
</html>
```
