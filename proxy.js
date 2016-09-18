var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();
var options = {
    'nightspeller.net': 'http://127.0.0.1:3001',
    'streams.nightspeller.net': 'http://127.0.0.1:3002'
};

http.createServer(function(req, res) {
    console.log(req.headers.host);
    proxy.web(req, res, {
        target: options[req.headers.host]
    });
}).listen(5000);