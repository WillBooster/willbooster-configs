import eslintPluginReact from '@eslint-react/eslint-plugin';
import jsConfig from '@willbooster/eslint-config-js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';

export default [
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
