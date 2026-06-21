// wbfy:start oxlint-base
/// <reference types="node" />
import type { OxlintConfig } from 'oxlint';

// oxlint-disable unicorn/prefer-module -- Oxlint only auto-discovers .ts config files, and CommonJS avoids ESM package loading issues.
const oxlintBaseConfig = require('@willbooster/oxlint-config');

// Oxlint only supports type-aware options in the root config, while it
// still auto-discovers package-local config files in monorepos. Keep this as a
// structured clone so packages can delete root-only settings without mutating
// the shared imported config object.
const oxlintResolvedConfig: OxlintConfig = structuredClone(oxlintBaseConfig.default ?? oxlintBaseConfig);
delete oxlintResolvedConfig.options;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
module.exports = oxlintResolvedConfig;
// wbfy:end oxlint-export
