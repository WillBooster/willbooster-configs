import jsReactConfig from '@willbooster/eslint-config-js-react';
import tsConfig from '@willbooster/eslint-config-ts';

// Some upstream configs (e.g. react-hooks) now return arrays of config objects, so flatten one level.
const flattenConfigs = (configs) => configs.flatMap((config) => (Array.isArray(config) ? config : [config]));

export default [
  ...flattenConfigs(jsReactConfig),
  ...tsConfig.map((config) => ({
    ...config,
    ...('files' in config
      ? { files: config.files.map((file) => file.replace('{cts,mts,ts}', '{cts,mts,ts,tsx}')) }
      : undefined),
  })),
];
