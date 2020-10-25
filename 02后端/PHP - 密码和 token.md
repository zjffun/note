---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# 密码

直接 md5 和 sha1 不安全！！！

`crypt()` 和`hash_equals()`：\
<http://php.net/manual/zh/function.crypt.php>

```
<?php
// crypt()和hash_equals()
$pwds = ['123456', '123456', '123456', 'aaa', '_123456789zxcvbnmasdfghjklqwertyuiop'];
function get_random_bytes($size){
  return function_exists('random_bytes') ? random_bytes($size) : mcrypt_create_iv($size);
}
function get_salt($size){
  return substr(strtr(base64_encode(get_random_bytes(32)), '+', '.'), 0, $size);
}
/**
MD5：12位的salt，只有8位随机（$1$ + 8位 + $）
*/
$t_s = microtime(true);
foreach ($pwds as $key => $pwd) {
  $t1 = microtime(true);
  $hashed_pwd = crypt($pwd, '$1$'.get_salt(8));
  $t2 = microtime(true);
  var_dump($pwd, $hashed_pwd);
  if (hash_equals($hashed_pwd, crypt($pwd, $hashed_pwd))) {
      echo 'Password is valid!';
  } else {
      echo 'Invalid password.';
  }
  $t3 = microtime(true);
  var_dump($t2-$t1, $t3-$t2);
  echo "<hr>";
}
$t_e = microtime(true);
$t = $t_e - $t_s;
echo "一共 $t 秒";
```

`password_hash()` 和`password_verify()`（挺慢的，做安全需求非常高的时候用。。）：\
<http://php.net/manual/zh/function.password-hash.php>

```
<?php
// password_hash()和password_verify()
$pwds = ['123456', '123456', '123456', 'aaa', '_123456789zxcvbnmasdfghjklqwertyuiop'];
/**
 * 我们想要使用默认算法散列密码
 * 当前是 BCRYPT，并会产生 60 个字符的结果。
 *
 * 请注意，随时间推移，默认算法可能会有变化，
 * 所以需要储存的空间能够超过 60 字（255字不错）
 */
$t_s = microtime(true);
foreach ($pwds as $key => $pwd) {
  $t1 = microtime(true);
  $hashed_pwd = password_hash($pwd, PASSWORD_DEFAULT);
  $t2 = microtime(true);
  var_dump($pwd, $hashed_pwd);
  if (password_verify($pwd, $hashed_pwd)) {
      echo 'Password is valid!';
  } else {
      echo 'Invalid password.';
  }
  $t3 = microtime(true);
  var_dump($t2-$t1, $t3-$t2);
  echo "<hr>";
}
$t_e = microtime(true);
$t = $t_e - $t_s;
echo "一共 $t 秒";
```

# token 和 sale

> <http://php.net/manual/zh/function.random-bytes.php#118932>\
> I used below function to create random token, and also a salt from the token. I used it in my application to prevent CSRF attack.

```
<?php
function RandomToken($length = 32){
    if(!isset($length) || intval($length) <= 8 ){
      $length = 32;
    }
    if (function_exists('random_bytes')) {
        return bin2hex(random_bytes($length));
    }
    if (function_exists('mcrypt_create_iv')) {
        return bin2hex(mcrypt_create_iv($length, MCRYPT_DEV_URANDOM));
    }
    if (function_exists('openssl_random_pseudo_bytes')) {
        return bin2hex(openssl_random_pseudo_bytes($length));
    }
}

function Salt(){
    return substr(strtr(base64_encode(hex2bin(RandomToken(32))), '+', '.'), 0, 44);
}

echo (RandomToken());
echo "<hr>";
echo Salt();
echo "<hr>";

/*
This function is same as above but its only used for debugging
*/
/*
function RandomTokenDebug($length = 32){
    if(!isset($length) || intval($length) <= 8 ){
      $length = 32;
    }
    $randoms = array();
    if (function_exists('random_bytes')) {
        $randoms['random_bytes'] = bin2hex(random_bytes($length));
    }
    if (function_exists('mcrypt_create_iv')) {
        $randoms['mcrypt_create_iv'] = bin2hex(mcrypt_create_iv($length, MCRYPT_DEV_URANDOM));
    }
    if (function_exists('openssl_random_pseudo_bytes')) {
        $randoms['openssl_random_pseudo_bytes'] = bin2hex(openssl_random_pseudo_bytes($length));
    }

    return $randoms;
}
echo "\n";
print_r (RandomTokenDebug());

?>
*/
```
