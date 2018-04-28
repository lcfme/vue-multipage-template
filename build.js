#! /usr/bin/env node

var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
var glob = require('glob');
var browserify = require('browserify');
var babelify = require('babelify');
var vueify = require('vueify');

var config = require('./config');

process.env.NODE_ENV = config.env;

function resolve(...args) {
    return path.resolve(__dirname, ...args);
}

shell.rm('-rf', resolve('./dist'));

glob('./src/**', function(err, files) {
    files.forEach(function(file) {
        switch (true) {
            case /index\.js$/.test(file):
                var _file = resolve(file),
                    _baseDir = resolve('./src'),
                    _relativeDir = path.relative(_baseDir, _file),
                    _targetFile = resolve('dist', _relativeDir),
                    _targetDir = path.dirname(_targetFile);
                shell.mkdir('-p', _targetDir);
                browserify({
                    entries: _file,
                    debug: config.env === 'development',
                    insertGlobals: true,
                    builtins: true
                })
                    .transform('vueify')
                    .transform('babelify', {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    })
                    .bundle()
                    .pipe(fs.createWriteStream(_targetFile));
                break;
            case !/\.js$|\.vue$|\.less$/.test(file):
                var _file = resolve(file),
                    _baseDir = resolve('./src'),
                    _relativeDir = path.relative(_baseDir, _file),
                    _targetFile = resolve('dist', _relativeDir),
                    _targetDir = path.dirname(_targetFile);
                shell.mkdir('-p', _targetDir);
                shell.cp(_file, _targetFile);
                break;
        }
    });
});
