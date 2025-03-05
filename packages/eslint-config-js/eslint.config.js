import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginSortClassMembers from 'eslint-plugin-sort-class-members';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  {
    files: ['{,src/**/,tests/**/,scripts/**/}*.{cjs,js,mjs}'],
    ignores: [
      // Directories
      '.yarn/**',
      '3rd-party/**',
      '@types/**',
      '__generated__/**',
      'android/**',
      'build/**',
      'coverage/**',
      'dist/**',
      'ios/**',
      'no-format/**',
      'node_modules/**',
      'temp/**',
      'test-fixtures/**',
      // Files
      '*.d.ts',
      '*.min.*js',
    ],
  },
  // cf. https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js
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
  // cf. https://github.com/prettier/eslint-config-prettier#installation
  eslintConfigPrettier,
];
