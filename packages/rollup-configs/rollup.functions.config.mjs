import fs from 'node:fs';
import path from 'node:path';

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { externals } from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';

export function getRollupConfig(input, packageJsonPath, firebaseJsonPath) {
  const extensions = ['.cjs', '.mjs', '.js', '.json', '.cts', '.mts', '.ts'];
  const plugins = [
    json(),
    externals({ deps: true, devDeps: false }),
    resolve({ extensions }),
    commonjs(),
    babel({ extensions, babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  ];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(terser());
  }

  const packageJsonText = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonText);
  const mainFileName = packageJson.main.split('/')[1];

  const firebaseJsonText = fs.readFileSync(firebaseJsonPath, 'utf8');
  const firebaseJson = JSON.parse(firebaseJsonText);

  return {
    input,
    output: {
      file: path.resolve(path.dirname(firebaseJsonPath), firebaseJson.functions.source, mainFileName),
      format: 'commonjs',
      sourcemap: true,
    },
    plugins,
  };
}
