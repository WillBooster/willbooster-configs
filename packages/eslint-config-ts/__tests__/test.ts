import child_process from 'child_process';

import { sampleValue } from '@willbooster/common/src';
import { useImmer } from 'use-immer';

child_process.exec('echo 0');
console.log(useImmer);
console.log(sampleValue);
