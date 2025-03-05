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
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '3rd-party/**',
      '@types/**',
      '__generated__/**',
      'android/**',
      'ios/**',
      'no-format/**',
      'test-fixtures/**',
      '*.config.*js',
      '*.d.ts',
      '*.min.*js',
      '.yarn/**',
      '.pnp.js',
      '.env.production',
      '*/mount/*.hash',
    ],
  },
  ...tsConfig,
  ...compat.extends('next/core-web-vitals'),
  {
    settings: {
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
    },
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
    // A default export is required in app and page files.
    // See also https://nextjs.org/docs/app/building-your-application/routing#file-conventions
    files: [
      'src/app/**/{layout,page,loading,not-found,error,template,default}.tsx',
      'src/app/global-error.tsx',
      'src/pages/**/*.tsx',
      'src/pages/api/**/*.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
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
          ignore: ['^\\[.+\\]\\.tsx?$'],
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
