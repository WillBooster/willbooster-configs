import eslintPluginReact from '@eslint-react/eslint-plugin';
import jsConfig from '@willbooster/eslint-config-js';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

const reactHooksFlatRecommended = eslintPluginReactHooks.configs.flat.recommended;
const reactHooksConflictRules = Object.fromEntries(
  [
    'component-hook-factories',
    'error-boundaries',
    'exhaustive-deps',
    'immutability',
    'purity',
    'refs',
    'rules-of-hooks',
    'set-state-in-effect',
    'set-state-in-render',
    'unsupported-syntax',
    'use-memo',
  ].map((ruleName) => [`@eslint-react/${ruleName}`, 'off'])
);

export default [
  ...jsConfig,
  {
    files: ['{,prisma/**/,src/**/,test/**/,scripts/**/}*.jsx'],
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
  // cf. https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#readme
  reactHooksFlatRecommended,
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
      ...reactHooksConflictRules,
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
