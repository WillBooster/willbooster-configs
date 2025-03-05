import jsConfig from '@willbooster/eslint-config-js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  ...jsConfig,
  {
    files: ['{,src/**/,tests/**/,scripts/**/}*.jsx'],
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
  // cf. https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  // cf. https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts
  eslintPluginReactHooks.configs['recommended-latest'],
  {
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
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // cf. https://github.com/prettier/eslint-config-prettier#installation
  eslintConfigPrettier,
];
