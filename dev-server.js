#! /usr/bin/env node

require('./watcher');

var path = require('path'),
    http = require('http'),
    express = require('express'),
    serveIndex = require('serve-index'),
    httpProxy = require('http-proxy-middleware'),
    config = require('./config'),
    app = express();

if (typeof config.proxyTable === 'object') {
    Object.keys(config.proxyTable).forEach(function(route) {
        app.use(route, httpProxy(config.proxyTable[route]));
    });
}

app.use(
    express.static(path.resolve(__dirname, './dist')),
    serveIndex(path.resolve(__dirname, './dist'), { icons: true })
);

http.createServer(app).listen(config.port, function(err) {
    console.log('server running at :' + config.port);
});
