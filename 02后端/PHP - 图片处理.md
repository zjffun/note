# 开启 GD 扩展（php_gd2.dll）

# 创建画布

画布：一种资源型数据，可以操作的图像资源。  

-   创建新画布（新建）
    ImageCreate(宽，高); 创建基于调色板的画布。  
    imageCreateTrueColor(宽，高); 创建真彩色的画布。  
-   基于图片创建画布（打开）
    imageCreateFromJPEG(图片地址);  
    imageCreateFromPNG(图片地址);  
    imageCreateFromGIF(图片地址);

# 操作画布

-   分配颜色：如果需要在画布上使用某个颜色，应该先将颜色分配到画布上。
    颜色标识 = imageColorAllocate(画布，R，G，B)
-   填充画布：将填充点，连续并且颜色相同的点进行填充（替换）
    imageFill(画布, 填充位置 x，填充位置 Y，颜色标识)
    位置采用坐标进行管理：  
    画布的原点（左上角）：0, 0  
    画布的右下角：width-1,height-1  

# 输出画布

输出到图片文件或直接输出（直接输出到浏览器）

1.  `imagePNG(画布 [, 文件地址])`;
2.  `imageJPEG()`;
3.  `imageGIF()`;

注意：  
如果没有第二个参数，表示直接输出。  
如果直接输出到浏览器，需要告知浏览器响应数据的类型应该是 XXX 格式的图片：`header(Content-Type: image/XXX)`
一个画布可以输出多次，输出为各种格式

# 销毁画布资源

imageDestroy();

# 例：验证码生成 (修改了一下 CI 框架的)

```php
<?php
function create_captcha($data = '', $img_path = '', $img_url = '', $font_path = ''){
  $defaults = array(
    'word'    => '',
    'img_path'  => '',
    'img_url' => '',
    'img_width' => '150',
    'img_height'  => '30',
    'font_path' => '',
    'expiration'  => 7200,
    'word_length' => 4,
    'font_size' => 16,
    'img_id'  => '',
    'pool'    => '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ',
    'colors'  => array(
      'background'  => array(255,255,255),
      'border'  => array(153,102,102),
      'text'    => array(204,153,153),
      'grid'    => array(255,182,182)
    )
  );

  // -----------------------------------
  // 遍历defaults将每个下标创建出变量
  // 如果参数$data中有这个下标则使用$date中的值作为该变量的值
  // -----------------------------------
  foreach ($defaults as $key => $val){
    if ( ! is_array($data) && empty($$key))
    {
      $$key = $val;
    }
    else
    {
      $$key = isset($data[$key]) ? $data[$key] : $val;
    }
  }
  // -----------------------------------
  // 检测gd扩展是否加载
  // -----------------------------------
  if (! extension_loaded('gd')){
    return FALSE;
  }
  
  // -----------------------------------
  // Do we have a "word" yet?
  // -----------------------------------
  if (empty($word))
  {
    $word = '';
    $pool_length = strlen($pool);
    $rand_max = $pool_length - 1;

    // PHP7 or a suitable polyfill
    if (function_exists('random_int'))
    {
      try
      {
        for ($i = 0; $i < $word_length; $i++)
        {
          $word .= $pool[random_int(0, $rand_max)];
        }
      }
      catch (Exception $e)
      {
        // This means fallback to the next possible
        // alternative to random_int()
        $word = '';
      }
    }
  }

  if (empty($word))
  {
    for ($i = 0; $i < $word_length; $i++)
    {
      $word .= $pool[mt_rand(0, $rand_max)];
    }
  }
  elseif ( ! is_string($word))
  {
    $word = (string) $word;
  }

  // -----------------------------------
  // Determine angle and position（angle画字的时候用，x_axis和y_axis画圆的时候用）
  // -----------------------------------
  $length = strlen($word);
  $angle  = ($length >= 6) ? mt_rand(-($length-6), ($length-6)) : 0;
  $x_axis = mt_rand(6, (360/$length)-16);
  $y_axis = ($angle >= 0) ? mt_rand($img_height, $img_width) : mt_rand(6, $img_height);

  // Create image
  // PHP.net recommends imagecreatetruecolor(), but it isn't always available
  $im = function_exists('imagecreatetruecolor')
    ? imagecreatetruecolor($img_width, $img_height)
    : imagecreate($img_width, $img_height);

  // -----------------------------------
  //  Assign colors
  // ----------------------------------

  is_array($colors) OR $colors = $defaults['colors'];

  foreach (array_keys($defaults['colors']) as $key)
  {
    // Check for a possible missing value
    is_array($colors[$key]) OR $colors[$key] = $defaults['colors'][$key];
    /*
    *'background'，'border'，'text'这三个颜色给画布，并放到$colors[$key]数组中。
    *处理前$colors为
    *array (size=4)
    *  'background' => 
    *    array (size=3)
    *      0 => int 255
    *      1 => int 255
    *      2 => int 255
    *  'border' => 
    *    array (size=3)
    *      0 => int 153
    *      1 => int 102
    *      2 => int 102
    *  'text' => 
    *    array (size=3)
    *      0 => int 204
    *      1 => int 153
    *      2 => int 153
    *  'grid' => 
    *    array (size=3)
    *      0 => int 255
    *      1 => int 182
    *      2 => int 182
    *处理后$colors为
    *array (size=4)
    *  'background' => int 16777215
    *  'border' => int 10053222
    *  'text' => int 13408665
    *  'grid' => int 16758454
    */
    $colors[$key] = imagecolorallocate($im, $colors[$key][0], $colors[$key][1], $colors[$key][2]);
  }
  // Create the rectangle
  ImageFilledRectangle($im, 0, 0, $img_width, $img_height, $colors['background']);

  // -----------------------------------
  //  Create the spiral pattern（创建旋转图样）
  // -----------------------------------
  //theta：n. 希腊字母的第八字；时间递耗值
  $theta    = 1;
  $thetac   = 7;
  //radius：半径
  $radius   = 16;
  //circles：圆
  $circles  = 20;
  //points：点
  $points   = 32;
  /*这里没弄懂*/
  for ($i = 0, $cp = ($circles * $points) - 1; $i < $cp; $i++)
  {
    $theta += $thetac;
    $rad = $radius * ($i / $points);
    $x = ($rad * cos($theta)) + $x_axis;
    $y = ($rad * sin($theta)) + $y_axis;
    $theta += $thetac;
    $rad1 = $radius * (($i + 1) / $points);
    $x1 = ($rad1 * cos($theta)) + $x_axis;
    $y1 = ($rad1 * sin($theta)) + $y_axis;
    imageline($im, $x, $y, $x1, $y1, $colors['grid']);
    $theta -= $thetac;
  }

  
  // -----------------------------------
  //  Write the text（有字体和没字体分两种处理）
  // -----------------------------------

  $use_font = ($font_path !== '' && file_exists($font_path) && function_exists('imagettftext'));
  if ($use_font === FALSE)
  {
    ($font_size > 5) && $font_size = 5;
    $x = mt_rand(0, $img_width / ($length / 3));
    $y = 0;
  }
  else
  {
    ($font_size > 30) && $font_size = 30;
    $x = mt_rand(0, $img_width / ($length / 1.5));
    $y = $font_size + 2;
  }

  for ($i = 0; $i < $length; $i++)
  {
    if ($use_font === FALSE)
    {
      $y = mt_rand(0 , $img_height / 2);
      imagestring($im, $font_size, $x, $y, $word[$i], $colors['text']);
      $x += ($font_size * 2);
    }
    else
    {
      $y = mt_rand($img_height / 2, $img_height - 3);
      imagettftext($im, $font_size, $angle, $x, $y, $colors['text'], $font_path, $word[$i]);
      $x += $font_size;
    }
  }
  // Create the border
  imagerectangle($im, 0, 0, $img_width - 1, $img_height - 1, $colors['border']);

  // -----------------------------------
  //  Generate the image（生成图像）
  // -----------------------------------

  if (function_exists('imagejpeg'))
  {
    header('Content-Type:image/jpeg');
    imagejpeg($im);
  }
  elseif (function_exists('imagepng'))
  {
    header('Content-Type:image/png');
    imagepng($im);
  }
  else
  {
    return FALSE;
  }

  ImageDestroy($im);

  return array('word' => $word);
}

create_captcha();
```

验证码刷新：

    onclick="this.src = 'url?...&'+Math.random()"
