/* eslint-env node */

const child_process = require('child_process');

const React = require('react');
const { useImmer } = require('use-immer');

child_process.exec('echo 0');
console.log(useImmer);

console.log(<div>テスト</div>);
