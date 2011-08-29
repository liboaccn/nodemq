

var config = require('../config'); 
var http   = require('http');
var route  = require('./route');

function start()
{
   function onRequest(req,res)
   {
      res.writeHead(200,{'Content-Type':'text/plain'});
      route.route(req,res);
   }
   http.createServer(onRequest).listen(config.server.port,config.server.host);
}

exports.start = start;

