import tsConfig from '@willbooster/eslint-config-ts';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...tsConfig,
  ...compat.extends('@blitzjs/next/eslint'),
  {
    rules: {
      'import-x/no-default-export': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['global', 'jsx'],
        },
      ],
      'react/prop-types': 'off',
    },
  },
  {
    // A default export is required in seed, mutation, query, and page files.
    files: [
      'db/**/*.ts',
      'src/**/mutations/*.ts',
      'src/**/queries/*.ts',
      'src/pages/**/*.tsx',
      'src/pages/api/**/*.ts',
    ],
    rules: { 'import-x/no-default-export': 'off' },
  },
  {
    // You can use brackets for dynamic routes.
    // See also https://nextjs.org/docs/routing/introduction#dynamic-route-segments
    files: ['src/blitz-client.ts', 'src/blitz-server.ts', 'src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
    rules: { 'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^\\[.+\\]\\.tsx?$'] }] },
  },
  {
    // You cannot use `undefined` in arguments or return values of mutations or queries. You can use `null` instead.
    files: ['src/**/mutations/*.ts', 'src/**/queries/*.ts'],
    rules: { 'unicorn/no-null': 'off' },
  },
];
