/* eslint-disable import-x/no-named-as-default-member, unicorn/no-null */

import jsConfig from '@willbooster/eslint-config-js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
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
