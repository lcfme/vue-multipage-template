#! /usr/bin/env node

var path = require('path');
var gaze = require('gaze');
var shell = require('shelljs');
var delayCompile = require('debounce')(reCompile, 200);

reCompile();

gaze(path.resolve(__dirname, './src/**'), function(err, watcher) {
    watcher.on('all', function(event, filepath) {
        delayCompile();
    });
});

function reCompile() {
    if (shell.exec('node ./build.js').code !== 0) {
        process.exit(1);
    }
    console.log('compiled');
}
