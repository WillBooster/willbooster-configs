// wbfy:start oxlint-base
// oxlint-disable unicorn/prefer-module -- Oxlint only auto-discovers .ts config files, and CommonJS avoids Node typeless ESM warnings.
const oxlintBaseConfig = require('@willbooster/oxlint-config');

// Oxlint only supports type-aware options in the root config, while it
// still auto-discovers package-local config files in monorepos. Keep this as a
// plain object copy so package typechecks do not export oxlint's private helper
// types through the generated config variable.
const oxlintResolvedConfig: Record<string, unknown> = { ...(oxlintBaseConfig.default ?? oxlintBaseConfig) };
delete oxlintResolvedConfig.options;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
module.exports = oxlintResolvedConfig;
// wbfy:end oxlint-export
