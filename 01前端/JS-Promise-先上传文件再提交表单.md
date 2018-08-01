很久前就使用过Bootstrap File Input上传文件，将上传文件返回的信息和表单一并提交回去。

最开始的时候是让用户手动点上传文件，然后再点提交表单；

之后尝试了写在回调里，不过这样会写的很复杂（可能有的地方用户选图片了有的没选，这样就得进行很多判断）；

之后又尝试过用户直接点提交表单，然后程序进行表单提交，并且使用setInterval判断文件是否上传完成，上传完成后提交表单。

前段时间学了[Promise](https://www.cnblogs.com/jffun-blog/p/9128196.html)，正好最近做项目又遇到了就牛刀小试了一下

# 功能流程
1. 点击提交表单
2. Bootstrap File Input上传文献（? 没有或一个）
3. Bootstrap File Input上传图片（+ 没有或多个）
4. 上传完成后将上传文件返回的信息和表单一并提交回去

# 代码

```
// 1.初始化文献上传和图片上传
var literature_fileinput = add_form.find('.literature-info input').fileinput({
  showPreview: false,
  showUpload: true,
  maxFileCount: 1,
  elErrorContainer: '#literature-file-errors',
  uploadUrl: SITE_URL + 'Handlers/FileUpload.ashx?method=ajaxLiteratureUpload'
})

var images_fileinput = add_form.find('.picture-info input').fileinput({
  showPreview: false,
  showUpload: true,
  elErrorContainer: '#literature-file-errors',
  allowedFileExtensions: ["jpg", "png", "gif"],
  uploadUrl: SITE_URL + 'Handlers/FileUpload.ashx?method=ajaxImagesUpload'
})

// 2.设置监听提交按钮点击事件
add_form.find('#js-submit').on('click', function() {
// 3.表单验证
  if ($('#add-form').parsley().validate()) {
// 4.文献上传
    (new Promise(function(resolve, reject){
      if (literature_fileinput.fileinput('getFilesCount') > 0){
        literature_fileinput.on('fileuploaded', function(event, data, previewId, index) {
          resolve({
            nam: data.response.fileName,
            path: data.response.filePath
          })
        }).fileinput('upload');
      }else{
        resolve(null);
      }
// 5.图片上传
    })).then(function(literature){
      return new Promise(function(resolve, reject){
        if (images_fileinput.fileinput('getFilesCount') > 0){
          var images = {nam: [], path: []};
          images_fileinput.on('fileuploaded', function(event, data, previewId, index) {
            images.nam.push(data.response.fileName);
            images.path.push(data.response.filePath);
          }).on('filebatchuploadcomplete', function(event, data, previewId, index) {
            resolve([literature, images]);
          }).fileinput('upload');
        }else{
          resolve([literature, null]);
        }
      })
// 6.表单提交上传
    }).then(function(literature_and_images){
      do_post(literature_and_images[0], literature_and_images[1])
    })
  }
})
```

# 注：
IE不支持很多ES6的语法需要用babel进行转换，并且babel默认不会转换Promise需要额外使用babel-polyfill

babel使用：https://www.cnblogs.com/jffun-blog/p/9402161.html
