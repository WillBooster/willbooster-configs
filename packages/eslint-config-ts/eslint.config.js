import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginSortClassMembers from 'eslint-plugin-sort-class-members';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'import-x': eslintPluginImportX,
      'sort-class-members': eslintPluginSortClassMembers,
      unicorn: eslintPluginUnicorn,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.json',
        }),
      ],
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
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
      '@typescript-eslint/no-explicit-any': 'error', // let's try avoding `any`
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }], // allow unused vars in object destructuring
      '@typescript-eslint/no-use-before-define': 'off', // abstract code should appear first
      eqeqeq: 'error',
      'no-console': 'off', // Allow `console.log()`.
      // Disallow 'enum' as it interferes with the tree-shaking process.
      // Additionally, when 'enum' is used with integers, it can lead to type-safety issues.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],
      'object-shorthand': 'error',
      'one-var': ['error', 'never'], // We prefer one variable declaration per line.
      'spaced-comment': 'error', // Enforce consistency of spacing after the start of a comment // or /*.
      'import-x/default': 'off', // To use `import XXX from YYY` instead of `import XXX = require(YYY)`.
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/order': [
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
      'unicorn/no-array-reduce': 'error',
      'unicorn/no-null': 'error',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-useless-undefined': [
        'error',
        {
          checkArguments: false,
        },
      ],
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  eslintConfigPrettier,
];
