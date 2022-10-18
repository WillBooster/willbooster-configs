import path from 'node:path';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import analyze from 'rollup-plugin-analyzer';
import { externals } from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';

import { getNamespace, readPackageJson } from './utils.mjs';

export function getRollupConfig(input, packageJsonPath, options) {
  const { sourcemap } = { sourcemap: true, ...options };
  const packageJson = readPackageJson(packageJsonPath);
  const extensions = ['.cjs', '.mjs', '.js', '.jsx', '.json', '.cts', '.mts', '.ts', '.tsx'];
  const namespace = packageJson && getNamespace(packageJson);
  const plugins = [
    json(),
    externals({
      deps: true,
      devDeps: true,
      exclude: namespace && new RegExp(`${namespace}\\/.+`),
    }),
    resolve({ extensions }),
    commonjs(),
    ts({
      transpiler: 'babel',
    }),
  ];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(terser(), analyze({ summaryOnly: true }));
  }

  const fileAndFormatList = [];
  if (packageJson.main) {
    fileAndFormatList.push([packageJson.main, 'commonjs']);
  }
  if (packageJson.module) {
    fileAndFormatList.push([packageJson.module, 'esm']);
  }
  return fileAndFormatList.map(([file, format]) => ({
    input,
    output: {
      dir: path.dirname(file),
      format,
      preserveModules: true,
      sourcemap,
    },
    plugins,
  }));
}
