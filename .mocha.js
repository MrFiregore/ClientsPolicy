'use strict';
const {colors, symbols} = require('mocha/lib/reporters/base');
colors.pass = 32;
symbols.ok = '😀';

module.exports = {
    require: ["@babel/register"],
    diff: true,
    extension: ['js'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    'watch-files': [ 'test/**/*.js']
};
