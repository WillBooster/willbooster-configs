// wbfy:start oxlint-base
import type { OxlintConfig } from 'oxlint';

import oxlintBaseConfig from '../oxlint-config/config.mjs';

const oxlintResolvedConfig: OxlintConfig = structuredClone(oxlintBaseConfig);
delete oxlintResolvedConfig.options;
// wbfy:end oxlint-base

// wbfy:start oxlint-export
export default oxlintResolvedConfig;
// wbfy:end oxlint-export
