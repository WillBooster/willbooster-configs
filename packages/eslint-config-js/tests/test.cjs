/* eslint-env node */

const child_process = require('node:child_process');

const { useImmer } = require('use-immer');

const { f } = require('./test2.mjs');

child_process.exec('echo 0');
console.log(useImmer);

f();
