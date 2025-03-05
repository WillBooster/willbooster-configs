/* eslint-disable unicorn/no-null */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import tsReactConfig from '@willbooster/eslint-config-ts-react';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

console.info(compat.extends('next/core-web-vitals'));

export default [
  ...compat.extends('next/core-web-vitals').map((config) => ({
    ...config,
  })),
  ...tsReactConfig.map((config) => {
    const clonedConfig = { ...config };
    if (clonedConfig.plugins) {
      const clonedPlugins = { ...clonedConfig.plugins };
      delete clonedPlugins['react-hooks'];
      clonedConfig.plugins = clonedPlugins;
    }
    return clonedConfig;
  }),
  {
    files: ['{,src/**/,tests/**/,scripts/**/}*.{cts,mts,ts,tsx}'],
    ignores: ['*.{cjs,js,mjs}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    // A default export is required in app and page files.
    // See also https://nextjs.org/docs/app/building-your-application/routing#file-conventions
    files: [
      'src/app/**/{layout,page,loading,not-found,error,template,default}.tsx',
      'src/app/global-error.tsx',
      'src/pages/**/*.tsx',
      'src/pages/api/**/*.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    // You can use brackets for dynamic routes.
    // cf. https://nextjs.org/docs/getting-started/project-structure
    files: ['src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [String.raw`^\[.+\]\.tsx?$`],
        },
      ],
    },
  },
  {
    // Request handlers must have the same name as the HTTP methods name (uppercase, e.g. `GET`).
    // https://nextjs.org/docs/app/api-reference/file-conventions/route
    files: ['src/app/api/**/route.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          // to use 'const ReactElem = () => { ...  };'
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          // allow any name when referring to import and property
          selector: ['import', 'property'],
          format: null,
        },
        {
          // allow any name in object destructuring of variable
          selector: 'variable',
          modifiers: ['destructured'],
          format: null,
        },
        {
          // allow any name in object destructuring of parameter
          selector: 'parameter',
          modifiers: ['destructured'],
          format: null,
        },
        {
          filter: '^(?:DELETE|GET|HEAD|OPTIONS|PATCH|POST|PUT)$',
          selector: 'function',
          modifiers: ['exported'],
          format: null,
        },
      ],
    },
  },
];
