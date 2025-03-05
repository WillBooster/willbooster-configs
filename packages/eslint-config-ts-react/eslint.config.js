import jsReactConfig from '@willbooster/eslint-config-js-react';
import tsConfig from '@willbooster/eslint-config-ts';

export default [
  ...jsReactConfig,
  ...tsConfig.map((config) => ({
    ...config,
    ...('files' in config
      ? { files: config.files.map((file) => file.replace('{cts,mts,ts}', '{cts,mts,ts,tsx}')) }
      : undefined),
  })),
];
