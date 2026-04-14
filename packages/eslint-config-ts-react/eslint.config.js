/* eslint-disable import-x/no-named-as-default-member, unicorn/no-null */

import js from '@eslint/js';
import eslintPluginReact from '@eslint-react/eslint-plugin';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginSortClassMembers from 'eslint-plugin-sort-class-members';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const jsConfig = [
  // Copied from packages/eslint-config-js/eslint.config.js to keep this published config self-contained.
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

const jsReactConfig = [
  // Copied from packages/eslint-config-js-react/eslint.config.js.
  ...jsConfig,
  {
    files: ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.{cjs,js,jsx,mjs}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // cf. https://eslint-react.xyz/docs/migrating-from-eslint-plugin-react
  eslintPluginReact.configs.recommended,
  // cf. https://www.npmjs.com/package/eslint-plugin-react-compiler
  eslintPluginReactCompiler.configs.recommended,
  {
    plugins: {
      perfectionist: eslintPluginPerfectionist,
    },
    settings: {
      'react-x': {
        version: 'detect',
      },
    },
    rules: {
      '@eslint-react/dom-no-unknown-property': [
        'error',
        {
          ignore: ['global', 'jsx'],
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: [
            {
              groupName: 'reserved',
              elementNamePattern: '^(children|dangerouslySetInnerHTML|key|ref)$',
            },
            {
              groupName: 'callback',
              elementNamePattern: '^on[A-Z]',
            },
          ],
          groups: ['reserved', 'shorthand-prop', 'unknown', 'callback'],
        },
      ],
    },
  },
  eslintConfigFlatGitignore(),
  // cf. https://github.com/prettier/eslint-config-prettier#installation
  eslintConfigPrettier,
];

const tsConfig = [
  // Copied from packages/eslint-config-ts/eslint.config.js.
  ...jsConfig,
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.{cts,mts,ts}'],
    ignores: ['*.{cjs,js,mjs}'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.{cts,mts,ts}'],
    ignores: ['*.{cjs,js,mjs}'],
  })),
  // cf. https://github.com/un-ts/eslint-plugin-import-x#configuration-new-eslintconfigjs
  eslintPluginImportX.flatConfigs.typescript,
  {
    files: ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.{cts,mts,ts}'],
    ignores: ['*.{cjs,js,mjs}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/camelcase': 'off', // c.f. https://github.com/typescript-eslint/typescript-eslint/issues/2050
      // cf. https://zenn.dev/bmth/articles/interface-props-extends
      // Note: `interface Params` causes errors on Next.js. We should extends it with Next.js `Params`.
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
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
      // We prefer https://typescript-eslint.io/rules/no-non-null-assertion/ to this
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
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
      '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: true }], // allow || for string, number, bigint and boolean
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
];

export default [
  ...jsReactConfig,
  ...tsConfig.map((config) => ({
    ...config,
    ...('files' in config
      ? { files: config.files.map((file) => file.replace('{cts,mts,ts}', '{cts,mts,ts,tsx}')) }
      : undefined),
  })),
];
