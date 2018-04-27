#! /usr/bin/env node

var gaze = require('gaze');
var shell = require('shelljs');
var delayCompile = require('debounce')(reCompile, 200);

reCompile();

gaze('./src/**', function(err, watcher) {
    this.on('all', function(event, filepath) {
        delayCompile();
    });
});

function reCompile() {
    if (shell.exec('NODE_ENV=development && node ./build.js').code !== 0) {
        process.exit(1);
    }
    console.log('compiled');
}
