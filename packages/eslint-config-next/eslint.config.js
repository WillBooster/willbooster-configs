/* eslint-disable unicorn/no-null */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginSortClassMembers from 'eslint-plugin-sort-class-members';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends('next/core-web-vitals'),

  // We import configs of eslint-config-js/js-react/ts/ts-react manually
  // because next/core-web-vitals depends on eslint-plugin-import,
  // but we want to keep using eslint-plugin-import-x in the above configs.

  // --------------- from eslint-config-js ---------------
  // Note: don't merge the below two objects!
  {
    files: ['{,src/**/,tests/**/,scripts/**/}*.{cjs,js,jsx,mjs}'],
  },
  {
    ignores: [
      // Directories
      '**/.venv/**',
      '**/.yarn/**',
      '**/3rd-party/**',
      '**/@types/**',
      '**/__generated__/**',
      '**/android/**',
      '**/bin/**',
      '**/build/**',
      '**/coverage/**',
      '**/dist/**',
      '**/ios/**',
      '**/no-format/**',
      '**/node_modules/**',
      '**/temp/**',
      '**/test-fixtures/**',
      '**/test/fixtures/**',
      // Files
      '**/*.d.ts',
      '**/*.min.*js',
    ],
  },
  // cf. https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js
  js.configs.recommended,
  // cf. https://github.com/sindresorhus/eslint-plugin-unicorn#recommended-config
  eslintPluginUnicorn.configs.recommended,
  {
    plugins: {
      'sort-class-members': eslintPluginSortClassMembers,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        // for Web
        ...globals.browser,
        ...globals.serviceworker,
        // for Node.js
        ...globals.node,
      },
    },
    rules: {
      eqeqeq: 'warn',
      'no-console': 'off', // Allow `console.log()`.
      'no-unused-vars': ['warn', { ignoreRestSiblings: true }], // Allow unused vars in object destructuring.
      'object-shorthand': 'error',
      'one-var': ['error', 'never'], // We prefer one variable declaration per line.
      'spaced-comment': 'error', // Enforce consistency of spacing after the start of a comment // or /*.
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-reduce': 'warn',
      'unicorn/no-null': 'warn',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-useless-undefined': [
        'error',
        {
          checkArguments: false,
        },
      ],
      'unicorn/prefer-top-level-await': 'warn',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  // -----------------------------------------------------------

  // --------------- from eslint-config-js-react ---------------
  // cf. https://github.com/jsx-eslint/eslint-plugin-react#flat-configs
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  // cf. https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts
  // To fix the error: ConfigError: Config "react-hooks/recommended": Key "plugins": Cannot redefine plugin "react-hooks".
  // TODO: re-enable the below configs after the error is fixed.
  // eslintPluginReactHooks.configs['recommended-latest'],
  // cf. https://www.npmjs.com/package/eslint-plugin-react-compiler
  eslintPluginReactCompiler.configs.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
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
  // -----------------------------------------------------------

  // --------------- from eslint-config-ts ---------------
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['{,src/**/,tests/**/,scripts/**/}*.{cts,mts,ts,tsx}'],
    ignores: ['*.{cjs,js,mjs}'],
  })),
  {
    files: ['{,src/**/,tests/**/,scripts/**/}*.{cts,mts,ts,tsx}'],
    ignores: ['*.{cjs,js,mjs}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/camelcase': 'off', // c.f. https://github.com/typescript-eslint/typescript-eslint/issues/2050
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
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
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'], // to use 'const ReactElem = () => { ...  };'
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'], // Allow PascalCase for React component functions
          leadingUnderscore: 'allow',
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
      ],
      '@typescript-eslint/no-explicit-any': 'error', // let's try avoiding `any`
      '@typescript-eslint/no-misused-promises': [
        // for React components
        // cf. https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }], // allow unused vars in object destructuring
      '@typescript-eslint/no-use-before-define': 'off', // abstract code should appear first
      '@typescript-eslint/restrict-template-expressions': 'off', // Allow any values in template literals
    },
  },
  // cf. https://github.com/sweepline/eslint-plugin-unused-imports#usage
  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigFlatGitignore(),
  // cf. https://github.com/prettier/eslint-config-prettier#installation
  eslintConfigPrettier,
  // -----------------------------------------------------------

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

export default config;
