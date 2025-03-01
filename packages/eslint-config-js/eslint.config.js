import js from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginSortClassMembers from 'eslint-plugin-sort-class-members';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      'import-x': eslintPluginImportX,
      'sort-class-members': eslintPluginSortClassMembers,
      unicorn: eslintPluginUnicorn,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      eqeqeq: 'warn',
      'no-console': 'off', // Allow `console.log()`.
      'no-unused-vars': ['warn', { ignoreRestSiblings: true }], // Allow unused vars in object destructuring.
      'object-shorthand': 'error',
      'one-var': ['error', 'never'], // We prefer one variable declaration per line.
      'spaced-comment': 'error', // Enforce consistency of spacing after the start of a comment // or /*.
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
  eslintConfigPrettier,
];
