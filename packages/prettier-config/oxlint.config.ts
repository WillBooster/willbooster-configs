// wbfy:start oxlint-base
/// <reference types="node" />
// oxlint-disable unicorn/prefer-module -- Oxlint only auto-discovers .ts config files, and CommonJS avoids ESM package loading issues.
const oxlintBaseConfig = require('@willbooster/oxlint-config');

// Oxlint only supports type-aware options in the root config, while it
// still auto-discovers package-local config files in monorepos. Keep this as a
// structured clone so package typechecks do not export oxlint's private helper
// types through the generated config variable.
const oxlintResolvedConfig = structuredClone(oxlintBaseConfig.default ?? oxlintBaseConfig) as Record<string, unknown>;
delete oxlintResolvedConfig.options;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
module.exports = oxlintResolvedConfig;
// wbfy:end oxlint-export
