import child_process from 'child_process';

import { useImmer } from 'use-immer';

import { sampleValue } from '../../shared/src';

child_process.exec('echo 0');
console.log(useImmer);
console.log(sampleValue);

console.log(<div>テスト</div>);
