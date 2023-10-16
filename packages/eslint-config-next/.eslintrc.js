const eslintConfigTs = require('@willbooster/eslint-config-ts');

module.exports = {
  extends: ['next/core-web-vitals', '@willbooster/eslint-config-ts'],
  rules: {
    'import/no-default-export': 'error',
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
  overrides: [
    {
      // A default export is required in app and page files.
      files: ['src/app/**/{layout,page}.tsx', 'src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
    {
      // You can use brackets for dynamic routes.
      // cf. https://nextjs.org/docs/getting-started/project-structure
      files: ['src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
      rules: { 'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^\\[.+\\]\\.tsx?$'] }] },
    },
    {
      // Request handlers must have the same name as the HTTP methods name (uppercase, e.g. `GET`).
      // https://nextjs.org/docs/app/api-reference/file-conventions/route
      files: ['src/app/api/**/route.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          ...eslintConfigTs.rules['@typescript-eslint/naming-convention'],
          {
            filter: '^(?:DELETE|GET|HEAD|OPTIONS|PATCH|POST|PUT)$',
            selector: 'function',
            modifiers: ['exported'],
            format: null,
          },
        ],
      },
    },
  ],
};
