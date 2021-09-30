const packageJson = require('../package.json');
const coreJsVersion = packageJson.peerDependencies['core-js'] || '';
const [major, minor, patch] = coreJsVersion.replace('^', '').split('.');
const corejs = major && minor && patch ? `${major}.${minor}` : '3';

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // Keep import statements for tree-shaking
          modules: false,
          useBuiltIns: 'usage',
          corejs,
          bugfixes: true,
        },
      ],
      '@babel/preset-react',
      '@babel/typescript',
    ],
    plugins: ['@babel/proposal-class-properties', '@babel/proposal-numeric-separator'],
    env: {
      production: {
        plugins: [
          [
            'transform-remove-console',
            {
              exclude: ['error', 'info', 'warn'],
            },
          ],
        ],
      },
    },
  };
};
