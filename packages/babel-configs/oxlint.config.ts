// wbfy:start oxlint-base
/// <reference types="node" />
import type { OxlintConfig } from 'oxlint';

// oxlint-disable unicorn/prefer-module -- Oxlint only auto-discovers .ts config files, and CommonJS avoids ESM package loading issues.
const oxlintBaseConfig = require('../oxlint-config/config.mjs');

// Oxlint rejects the root-only type-aware options outside the root config, so delete them
// here. This does NOT disable type checking: the lint commands pass the --type-aware and
// --type-check flags explicitly.
const oxlintResolvedConfig: OxlintConfig = structuredClone(oxlintBaseConfig.default ?? oxlintBaseConfig);
delete oxlintResolvedConfig.options;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
module.exports = oxlintResolvedConfig;
// wbfy:end oxlint-export
