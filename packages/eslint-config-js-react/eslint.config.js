import jsConfig from '@willbooster/eslint-config-js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  ...jsConfig,
  {
    files: ['{,src/**/,tests/**/,scripts/**/}*.jsx'],
  },
  // cf. https://github.com/jsx-eslint/eslint-plugin-react#flat-configs
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  // cf. https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts
  eslintPluginReactHooks.configs['recommended-latest'],
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
  eslintConfigFlatGitignore(),
  // cf. https://github.com/prettier/eslint-config-prettier#installation
  eslintConfigPrettier,
];
