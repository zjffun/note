    # 使用https
    server {                                                                      
        listen         443 ssl;                                                  
        server_name    www.****.com;#域名                          
        ssl_certificate      ssl_certs/1_www.****.com_cert.crt;#证书路径      
        ssl_certificate_key  ssl_certs/2_www.****.com.key;#key路径              
                                                                                 
        ssl_session_cache    shared:SSL:1m; #储存SSL会话的缓存类型和大小                        
        ssl_session_timeout  5m; #会话过期时间                                               
                                                                                 
        ssl_ciphers  HIGH:!aNULL:!MD5; #为建立安全连接，服务器所允许的密码格式列表                                          
        ssl_prefer_server_ciphers  on; #依赖SSLv3和TLSv1协议的服务器密码将优先于客户端密码
                                                
        location /     {                                                 
            root     /var/www/;                               
            index    index.html index.htm index.php;                           
        }                                                                
                                                                                 
        location ~ \.php$ {                                                      
            root           /var/www;                                     
            fastcgi_pass   127.0.0.1:9000;                                       
            fastcgi_index  index.php;                                            
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;  
            include        fastcgi_params;                                       
        }                                                                        
    }

    # 将http访问自动跳转到https
    server{                                                     
      listen 80 www.****.com;                           
      rewrite ^/(.*)$ https://www.****.com/$1 permanent;  
    }
