import tsConfig from '@willbooster/eslint-config-ts';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '3rd-party/**',
      '@types/**',
      '__generated__/**',
      'android/**',
      'ios/**',
      'no-format/**',
      'test-fixtures/**',
      '*.config.*js',
      '*.d.ts',
      '*.min.*js',
      '.yarn/**',
      '.pnp.js',
      '.env.production',
      '*/mount/*.hash',
    ],
  },
  ...tsConfig,
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import-x/core-modules': ['react-dom'],
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
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
