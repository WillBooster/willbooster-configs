// wbfy:start oxlint-base
import oxlintBaseConfig from '@willbooster/oxlint-config';

// Oxlint only supports type-aware options in the root config, while it
// still auto-discovers package-local config files in monorepos.
const { options: _rootOnlyOptions, ...oxlintResolvedConfig } = oxlintBaseConfig;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
export default oxlintResolvedConfig;
// wbfy:end oxlint-export
