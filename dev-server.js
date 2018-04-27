#! /usr/bin/env node

require('./watcher');

var path = require('path'),
    http = require('http'),
    express = require('express'),
    app = express(),
    httpProxy = require('http-proxy-middleware'),
    config = require('./config');

if (typeof config.proxyTable === 'object') {
    Object.keys(config.proxyTable).forEach(function(route) {
        app.use(route, httpProxy(config.proxyTable[route]));
    });
}

app.use(express.static(path.resolve(__dirname, './dist')));

http.createServer(app).listen(config.port, function(err) {
    console.log('server running at :' + config.port);
});