import tsConfig from '@willbooster/eslint-config-ts';

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
];
