import child_process from 'node:child_process';

import { useImmer } from 'use-immer';

import { sampleValue } from '../../shared/src/index.js';

child_process.exec('echo 0');
console.log(useImmer);
console.log(sampleValue);

console.log(<div>テスト</div>);
