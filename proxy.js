var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();
var options = {
    'nightspeller.net': 'http://127.0.0.1:3001',
    'streams.nightspeller.net': 'http://127.0.0.1:3002',
    'starjourney.nightspeller.net': 'http://127.0.0.1:3004',
    'lanks.nightspeller.net': 'http://127.0.0.1:4000'
};

var prevHost = '';
http.createServer(function(req, res) {
    if (req.headers.host !== prevHost) {
        console.log(req.headers.host+'\r\n');
        prevHost = req.headers.host;
    }
    var target = options[req.headers.host] ? options[req.headers.host] : 'http://127.0.0.1:3001';
    proxy.web(req, res, {
        target: target
    });
}).listen(80);