import { execSync } from 'node:child_process';

import { useImmer } from 'use-immer';

execSync('echo 0');
console.log(useImmer);
