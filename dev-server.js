var http = require('http'),
    express = require('express'),
    httpProxy = require('http-proxy-middleware'),
    env = require('env'),
    app = express();


http.createServer(app).listen(env.port, function(err) {
    console.log('server running at :' + env.port);
});