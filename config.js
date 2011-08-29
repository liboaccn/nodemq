

/*
 * nodeMQ 的Redis数据库的链接配置
 */
var redis_db={
   'host':'127.0.0.1',
   'port':6379
}

/*
 * nodeMQ Server端配置
 */
var server={
   'host':'127.0.0.1',
   'port':8000
}


export.db     = redis_db;
export.server = server; 
