var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');
var fs = require('fs');
require("console-stamp")(console, { pattern : "dd/mm/yyyy HH:MM:ss.l" });

var proxy = httpProxy.createProxy();
var options = {
    'nightspeller.net': 'http://127.0.0.1:3001',
    'streams.nightspeller.net': 'http://127.0.0.1:3002',
    'xn----7sbhdzihcxec9an7e.xn--p1ai': 'http://127.0.0.1:3003', //logistics-school
    'www.xn----7sbhdzihcxec9an7e.xn--p1ai': 'http://127.0.0.1:3003', //logistics-school
    'starjourney.nightspeller.net': 'http://127.0.0.1:3004',
    'logistvrn.ru': 'http://127.0.0.1:3005',
    'logist36.ru': 'http://127.0.0.1:3005',
    'xn--36-glcunsxi.xn--p1ai': 'http://127.0.0.1:3005' //logist36 in ru
};

var prevHost = '';

http.createServer(function (req, res) {
    if (req.headers.host === 'nightspeller.net' || req.headers.host === 'www.nightspeller.net'){
        res.writeHead(301, { "Location": "https://nightspeller.net" + req.url });
        res.end();
    } else if (req.headers.host === 'www.xn----7sbhdzihcxec9an7e.xn--p1ai') {
        res.writeHead(301, { "Location": "http://xn----7sbhdzihcxec9an7e.xn--p1ai" + req.url });
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
    pfx: fs.readFileSync('C:/SSL/nightspeller.net/nightspeller.net-all.pfx')
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