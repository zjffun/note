# jQuery 实现:

(监听右键点击不行，要用 contextmenu)

    $('#om_map').bind("contextmenu",function(e){
      e.preventDefault();
      console.log(e);
    });
