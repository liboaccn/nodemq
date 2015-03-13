
var url = require('url');
var requestHandle = require('./requestHandle');


function route(req,res)
{
    var handle = {};
    handle['/']    = requestHandle.start;
    handle['/put'] = requestHandle.put;
    handle['/get'] = requestHandle.get;
    handle['/postPut'] = requestHandle.postPut;
    handle['/getLen'] = requestHandle.getLen;
    handle['/getList'] = requestHandle.getList;

    var pathname = url.parse(req.url,true).pathname;
    if(typeof handle[pathname] === 'function')
    {
       handle[pathname](req,res);
    }
}

exports.route= route;

