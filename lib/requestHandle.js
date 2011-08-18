
var redis = require('./redis');
var client = redis.createClient(63791);
var url   = require('url');

function start(req,res)
{
  res.end('welcome to use nodemq');
}

function get(req,res)
{

  var data = url.parse(req.url,true).query.data;
  var multi = client.multi();
  //var replies = multi.rpop('queue').exec();
  //res.end('replies: '+replies);
  multi.rpop('queue').exec(function(err,replies){
  res.end(':'+replies);
});
}
function put(req,res)
{
  var data = url.parse(req.url,true).query.data;
  var multi = client.multi();
  multi.lpush('queue',data).exec(function(err,replies){
    res.end('queue: ' +replies);
  });

}



exports.start= start;
exports.get  = get;
exports.put  = put;

