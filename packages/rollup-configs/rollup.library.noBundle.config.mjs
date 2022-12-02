import path from 'node:path';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import analyze from 'rollup-plugin-analyzer';
import { externals } from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';

import { getNamespaceAndName, readPackageJson } from './utils.mjs';

export function getRollupConfig(input, packageJsonPath, options, embeddedVariables) {
  const { sourcemap } = { sourcemap: true, ...options };
  const packageJson = readPackageJson(packageJsonPath);
  const extensions = ['.cjs', '.mjs', '.js', '.jsx', '.json', '.cts', '.mts', '.ts', '.tsx'];
  const [namespace, name] = (packageJson && getNamespaceAndName(packageJson)) || [];
  const plugins = [
    replace({
      delimiters: ['', ''],
      preventAssignment: true,
      values: embeddedVariables || {},
    }),
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
      dir: fixOutputDir(path.dirname(file), name),
      format,
      preserveModules: true,
      sourcemap,
    },
    plugins,
  }));
}

function fixOutputDir(dirPath, packageName) {
  if (!packageName) return dirPath;

  const index = dirPath.indexOf(packageName);
  if (index < 0) return dirPath;

  return dirPath.slice(0, index);
}
