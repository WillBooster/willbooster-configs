module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Keep import statements for tree-shaking
        modules: false,
        useBuiltIns: 'usage',
        corejs: '3.14',
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
