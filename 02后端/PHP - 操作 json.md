---
updated: 'Thu, 28 Feb 2019 06:35:09 GMT'
date: 'Thu, 28 Feb 2019 06:35:09 GMT'
---

# 输出 json 文件中文处理

```php
<?php
$json_array = array();

// 1。转换为json字符串（不自动转换为unicode编码）
if (version_compare(PHP_VERSION,'5.4.0','<'))
	$json_string = preg_replace_callback("#\\\u([0-9a-f]{4})#i", function($matchs){return iconv('UCS-2BE','UTF-8',pack('H4', $matchs[1]));}, json_encode($json_array));
else
	$json_string = json_encode($json_array, JSON_UNESCAPED_UNICODE);

// 2。现在$json_string是gbk编码，转换为utf8
$json_string = iconv('GB2312', 'UTF-8', $tables);

// 3。输出到文件
file_put_contents('./json_string.json', $json_string);
```

# json 文件缩进调整

只能大概调整一下，以后再改进吧

```
/**
 * 重新调整json缩进
 * @Author   zjf
 * @DateTime 2017-03-10
 * @param    String     $json json字符串
 * @return   String     处理后的json字符串
 */
function reindent_json($json){
	preg_match_all('/\{|\}|,/',$json,$matches);
	$tab = 0;
	$eol = PHP_EOL;
	foreach ($matches[0] as $key => $value) {
		if ($value == '{') {
			$json = preg_replace('/\{(?!'.$eol.')/', "{".$eol.str_repeat("\t", ++$tab), $json, 1);
		}elseif ($value == '}') {
			$json = preg_replace('/([^\t])\}/', "$1".$eol.str_repeat("\t", --$tab)."}", $json, 1);
		}elseif ($value == ',') {
			$json = preg_replace('/,(?!'.$eol.')/', ",".$eol.str_repeat("\t", $tab), $json, 1);
		}
	}
	return $json;
}
```
