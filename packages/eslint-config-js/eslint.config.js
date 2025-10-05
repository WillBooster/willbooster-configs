import js from '@eslint/js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginSortClassMembers from 'eslint-plugin-sort-class-members';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  // Note: don't merge the below two objects!
  {
    files: ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.{cjs,js,mjs}'],
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
  // cf. https://github.com/un-ts/eslint-plugin-import-x#configuration-new-eslintconfigjs
  // eslint-disable-next-line import-x/no-named-as-default-member
  eslintPluginImportX.flatConfigs.recommended,
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
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      /** Because we faced false positives (e.g. fast-glob),  */
      'import-x/no-named-as-default-member': 'warn',
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
  // cf. https://github.com/sweepline/eslint-plugin-unused-imports#usage
  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
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
];
