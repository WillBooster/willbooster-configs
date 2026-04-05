import jsConfig from '@willbooster/eslint-config-js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

const reactHooksFlatRecommended = eslintPluginReactHooks.configs.flat.recommended;
const reactFiles = ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.jsx'];

export default [
  ...jsConfig,
  {
    files: reactFiles,
  },
  // cf. https://github.com/jsx-eslint/eslint-plugin-react#flat-configs
  addFilesToConfig(eslintPluginReact.configs.flat.recommended, reactFiles),
  addFilesToConfig(eslintPluginReact.configs.flat['jsx-runtime'], reactFiles),
  // cf. https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#readme
  addFilesToConfig(reactHooksFlatRecommended, reactFiles),
  // cf. https://www.npmjs.com/package/eslint-plugin-react-compiler
  addFilesToConfig(eslintPluginReactCompiler.configs.recommended, reactFiles),
  {
    files: reactFiles,
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

function addFilesToConfig(config, files) {
  return {
    ...config,
    files,
  };
}
