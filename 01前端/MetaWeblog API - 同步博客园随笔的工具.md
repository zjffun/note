不清楚将这篇博客放到前端合不合适。。

# 博客园 MetaWeblog 的用法

API: [rpc.cnblogs.com/metaweblog/jffun-blog#BlogInfo](about:blank)

一般都用 XML-RPC 库（Node.js 环境下可以用[baalexander/node-xmlrpc](https://github.com/baalexander/node-xmlrpc)），下面是直接使用的流程：

1.  构造请求主体的 XML，格式参见[XML-RPC](https://en.wikipedia.org/wiki/XML-RPC)或下面例子

2.  发送请求到`https://rpc.cnblogs.com/metaweblog / 您的博客名`

3.  解析响应主体中的 XML

例如：

```
地址：https://rpc.cnblogs.com/metaweblog/jffun-blog
方式：POST
请求主体：
<?xml version="1.0"?>
<methodCall>
  <methodName>blogger.getUsersBlogs</methodName>
  <params>
    <param>
        <value><string>appkey</string></value>
    </param>
    <param>
        <value><string>真能逗我笑</string></value>
    </param>
    <param>
        <value><string>这里是密码</string></value>
    </param>
  </params>
</methodCall>

响应主体：
<?xml version="1.0"?>
<methodResponse>
  <params>
    <param>
      <value>
        <array>
          <data>
            <value>
              <struct>
                <member>
                  <name>blogid</name>
                  <value>
                    <string>408721</string>
                  </value>
                </member>
                <member>
                  <name>url</name>
                  <value>
                    <string>https://www.cnblogs.com/jffun-blog/</string>
                  </value>
                </member>
                <member>
                  <name>blogName</name>
                  <value>
                    <string>真能逗我笑</string>
                  </value>
                </member>
              </struct>
            </value>
          </data>
        </array>
      </value>
    </param>
  </params>
</methodResponse>
```

# 参考

> -   [MetaWeblog - Wikipedia](https://en.wikipedia.org/wiki/MetaWeblog)
> -   [XML-RPC - Wikipedia](https://en.wikipedia.org/wiki/XML-RPC)
