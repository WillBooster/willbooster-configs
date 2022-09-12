/* eslint-env node */

const child_process = require('node:child_process');

const { useImmer } = require('use-immer');

child_process.exec('echo 0');
console.log(useImmer);
