import { execSync } from 'node:child_process';

import { sampleValue } from '@willbooster/shared/src/index.js';
import { useImmer } from 'use-immer';

import { f } from './test2.mjs';

execSync('echo 0');
console.log(useImmer);
console.log(sampleValue);

f();
