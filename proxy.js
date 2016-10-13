var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');
var fs =require('fs');

var proxy = httpProxy.createProxy();
var options = {
    'nightspeller.net': 'http://127.0.0.1:3001',
    'streams.nightspeller.net': 'http://127.0.0.1:3002',
    'starjourney.nightspeller.net': 'http://127.0.0.1:3004'
};

var prevHost = '';

http.createServer(function (req, res) {
    if (req.headers.host === 'nightspeller.net'){
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    } else {
        if (req.headers.host !== prevHost) {
            console.log(req.headers.host+'\r\n');
            prevHost = req.headers.host;
        }
        var target = options[req.headers.host] ? options[req.headers.host] : 'http://127.0.0.1:3001';
        proxy.web(req, res, {
            target: target
        });
    }
}).listen(80);


https.createServer({
    pfx: fs.readFileSync('C:/Users/Administrator/AppData/Roaming/letsencrypt-win-simple/httpsacme-v01.api.letsencrypt.org/nightspeller.net-all.pfx')
}, function (req, res) {
    if (req.headers.host !== prevHost) {
        console.log(req.headers.host+'\r\n');
        prevHost = req.headers.host;
    }
    var target = options[req.headers.host] ? options[req.headers.host] : 'http://127.0.0.1:3001';
    proxy.web(req, res, {
        target: target
    });
}).listen(443);