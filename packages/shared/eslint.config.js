import tsConfig from '@willbooster/eslint-config-ts';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },
  ...tsConfig,
];
