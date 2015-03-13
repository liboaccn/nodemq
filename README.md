# nodemq
nodejs redis queue
一个NodeJS和redis做的基于http协议使用的队列 做了点小修改 支持多个队列和post提交
原github地址：https://github.com/lnmp/nodemq
使用方法：

一个NodeJS和redis做的队列

在安装好redis和nodejs后，配置config.js
执行: $ node index.js 启动服务


入队：

(1)默认队列
http://127.0.0.1:8000/put?data=入队内容
(2)自定义队列
http://127.0.0.1:8000/postPut
post方式提交json串  {"postData”:”入队内容","queueName":"队列名称”}

出队：

(1)默认队列
http://127.0.0.1:8000/get
(2)自定义队列
http://127.0.0.1:8000/get?queueName=队列名称


获取队列内容：
http://127.0.0.1:8000/getList
http://127.0.0.1:8000/getList?queueName

获取队列长度:
http://127.0.0.1:8000/getLen
http://127.0.0.1:8000/getList?queueName
