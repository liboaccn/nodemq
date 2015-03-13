
var iconv = require('iconv-lite');
var config = require('../config'); 
var redis  = require('./redis-client');
var db = redis.createClient(config.db.port,config.db.host);
var url    = require('url');

function start(req,res)
{
  res.end('welcome to use nodemq');
}


function postPut(request, response) {
   var postData = "";
   var pathname = url.parse(request.url).pathname;
   // console.log("Request for " + pathname + " received.");
   // request.setEncoding("utf8");
   // console.log(request);
   request.addListener("data", function(postDataChunk) {
     postData += iconv.decode(postDataChunk,'utf8');
     // console.log("Received POST data chunk '"+ postDataChunk + "'.");
   });

   request.addListener("end", function() {
   	 var jsonObj;
   	 // console.log
   	 // var eee = iconv.decode(postData,'utf8');
     if (postData && postData.length > 0) {
     	jsonObj = JSON.parse(postData);
     }else{
     	response.end('error: data null');
     	return;
     }
     // console.log(jsonObj);
     if (jsonObj && jsonObj.queueName && jsonObj.postData ) {
     	var buff = iconv.encode(jsonObj.postData,"utf8");
     	// console.log(buff);
     	db.lpush(jsonObj.queueName,buff,function(err,replies){
	        response.end(JSON.parse(postData).queueName + ':' +replies);
	    });
     }else{
     	var buff = iconv.encode(postData,"utf8");
     	db.lpush('queue',buff,function(err,replies){
	   	    response.end('queue:' +replies);
		});
     }
     

   });
 }


function getList(req,res){
  //lrange
  var query = url.parse(req.url,true).query;
  if (query.queueName) {

        db.llen(query.queueName,function(err,listLength){
             db.lrange(query.queueName,'0',''+listLength,function(err,list){
              // console.log("-------"+query.queueName);
              // console.log(err);
              // console.log(""+list);
              // console.log("-------");
              if (list) {
                console.log(list);
                for (var i = list.length - 1; i >= 0;i--) {
                  list[i]=""+list[i];
                  console.log(i+1+":"+list[i]);
                };

                res.end(JSON.stringify(list));
              }else{
                res.end("");
              }
            });
          
        });
        


  }else{

    db.llen("queue",function(err,listLength){

             db.lrange("queue",'0',''+listLength,function(err,list){
              if (list) {
                res.end(""+list);  //输出方式可以调整成json
              }else{
                res.end("");
              }
            });
          
        });
      db.lrange("queue",function(err,replies){
        console.log(replies);
          if (replies) {
            res.end(replies);
          }else{
            res.end("");
          }
          
        });
  }
}


function getLen(req,res){
  var query = url.parse(req.url,true).query;
  if (query.queueName) {


        db.llen(query.queueName,function(err,replies){
          if (replies) {
            res.end(""+replies);
          }else{
            res.end(""+0);
          }
          
        });


  }else{
      db.llen("queue",function(err,replies){
          if (replies) {
            res.end(""+replies);
          }else{
            res.end(""+0);
          }
          
        });
  }
}

function get(req,res)
{



  var query = url.parse(req.url,true).query;
  if (query.queueName) {

  	   db.rpop(query.queueName, function(err,replies){
  	   	var str;
  	   	 if (replies) {
  	   	 	// console.log(replies);
  	   	 	str = iconv.decode(replies,"utf8");
  	   	    // console.log(str);
  	   	 }else{
  	   	 	str = "";
  	   	 }
         res.end(str);
      });
  }else{
  	  db.rpop('queue', function(err,replies){
  	  	 var str;
  	   	 if (replies) {
  	   	 	str = iconv.decode(replies,"utf8");
  	   	    // console.log(str);
  	   	 }else{
  	   	 	str = "";
  	   	 }
         res.end(str);
      });
  }
  
}
function put(req,res)
{
  var data = url.parse(req.url,true).query.data;
  // console.log(req);
  if (data) {
  	  db.lpush('queue',data,function(err,replies){
	    res.end('queue: ' +replies);
	  });
  }else{
  	  response.end('error: data null');
  }
  

}



exports.start= start;
exports.get  = get;
exports.put  = put;
exports.postPut = postPut;
exports.getLen = getLen;
exports.getList = getList;
