import child_process from 'child_process';

import React from 'react';
import { useImmer } from 'use-immer';

child_process.exec('echo 0');
console.log(useImmer);

console.log(<div>テスト</div>);
