

var config = require('../config'); 
var redis  = require('./redis-client');
var db = redis.createClient(config.db.port,config.db.host);
var url    = require('url');

function start(req,res)
{
  res.end('welcome to use nodemq');
}

function get(req,res)
{

  var data = url.parse(req.url,true).query.data;
  db.rpop('queue', function(err,replies){
  res.end(':'+replies);
});
}
function put(req,res)
{
  var data = url.parse(req.url,true).query.data;
  db.lpush('queue',data,function(err,replies){
    res.end('queue: ' +replies);
  });

}



exports.start= start;
exports.get  = get;
exports.put  = put;

