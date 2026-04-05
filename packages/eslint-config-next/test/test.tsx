import { execSync } from 'node:child_process';

import { sampleValue } from '@willbooster/shared/src/index.js';
import { useImmer } from 'use-immer';

execSync('echo 0');
console.log(useImmer);
console.log(sampleValue);

console.log(<div>テスト</div>);
