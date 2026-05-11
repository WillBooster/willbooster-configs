// wbfy:start oxlint-base
// oxlint-disable unicorn/prefer-module -- Oxlint only auto-discovers .ts config files, and CommonJS avoids Node typeless ESM warnings.
const oxlintBaseConfig = require('@willbooster/oxlint-config');

// Oxlint only supports type-aware options in the root config, while it
// still auto-discovers package-local config files in monorepos.
const { options: _rootOnlyOptions, ...oxlintResolvedConfig } = oxlintBaseConfig.default ?? oxlintBaseConfig;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
module.exports = oxlintResolvedConfig;
// wbfy:end oxlint-export
