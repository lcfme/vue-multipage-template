#! /usr/bin/env node

var gaze = require('gaze');
var shell = require('shelljs');
var delayCompile = require('debounce')(reCompile, 800);


gaze('./src/**', function(err, watcher) {
    this.on('all', function(event, filepath) {
        delayCompile();
    });
});

function reCompile() {
    if (shell.exec('./build.js').code !== 0) {
        process.exit(1);
    }
    console.log('recompiled');
}