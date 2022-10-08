import externals from 'rollup-plugin-node-externals';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import { getNamespace } from './utils.mjs';

export function getRollupConfig(input, packageJsonPath) {
  const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'];
  const namespace = packageJsonPath ? getNamespace(packageJsonPath) : undefined;
  const plugins = [
    json(),
    externals({
      deps: true,
      devDeps: true,
      exclude: namespace && new RegExp(`${namespace}\\/.+`),
    }),
    resolve({ extensions }),
    commonjs(),
    babel({ extensions, babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  ];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(terser(), analyze({ summaryOnly: true }));
  }

  return {
    input,
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
    },
    plugins,
  };
}
