> 官方文档：<https://www.newtonsoft.com/json/help/html/SerializeObject.htm>

一种方式就可以生成所有的 JSON  
Collection -> 数组  
Object
, Dictionary -> 对象

PS：Dictionary 不用根据数据格式创建类但但复用性不好，Object 需要根据数据格式创建类但复用性好也能用 get，set 处理属性

例如：

    /*
    接口格式：
    {
        code:返回结果状态
        message:消息
        data:[
            {
                provider:提供者
                name:数据名称,
                description:[
                    {key:***,value:***}
                    {key:***,value:***}
                ],
                download:下载,
                thumbnail:缩略图,
                detail:详情
            }
        ]
    }
    */

    Dictionary<String, Object> data = new Dictionary<String, Object>
    {
        {"code", 0},
        {"message", ""},
        {"data", new List<Object>{
            new Dictionary<String, Object>{
                {"provider", "提供者"},
                {"name", "古生物化石数据"},
                {"description", new List<Object>{
                    new Dictionary<String, String>{
                        {"key", "xxx"},
                        {"value", "xxx"}
                    },
                    new Dictionary<String, String>{
                        {"key", "xxx"},
                        {"value", "xxx"}
                    }
                }},
                {"download", ""},
                {"thumbnail", ""},
                {"detail", ""},
            }
        }}
    };

    String json = JsonConvert.SerializeObject(data, Formatting.Indented);
