module.exports = {
  extends: [require.resolve('@blitzjs/next/eslint'), '@willbooster/eslint-config-ts-react'],
  rules: { 'import/no-default-export': 'error' },
  overrides: [
    {
      files: ['db/*.ts', 'src/**/mutations/*.ts', 'src/**/queries/*.ts', 'src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
    {
      files: ['src/blitz-client.ts', 'src/blitz-server.ts', 'src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
      rules: { 'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^\\[.+\\]\\.tsx?$'] }] },
    },
    {
      files: ['src/**/mutations/*.ts', 'src/**/queries/*.ts'],
      rules: { 'unicorn/no-null': 'off' },
    },
  ],
};
