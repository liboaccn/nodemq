


var http = require('http');
//var redis = require('./redis');
//var requestHandle = require('./requestHandle');
var route  = require('./route');
//var client = redis.createClient(63791,'127.0.0.1');

/*
http.createServer(function(req,res)
{
    res.writeHead(200,{'Content-Type':'text/plain'});
    var myurl= url.parse(req.url,true);
    res.end(util.inspect(myurl));
console.log(myurl.query.data);
    client.set("mykey", "myvalue", function (err, didSet) { 
      if(err) console.log(err);
      console.log(didSet); });
    client.dbsize( function (err, numKeys) { console.log(numKeys); });
}
).listen(8000);*/
function start()
{
   function onRequest(req,res)
   {
      res.writeHead(200,{'Content-Type':'text/plain'});
      route.route(req,res);
   }
   http.createServer(onRequest).listen(8000);
}


exports.start = start;

