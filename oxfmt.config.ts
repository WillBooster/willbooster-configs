// wbfy:start oxfmt-base
import type { OxfmtConfig } from 'oxfmt';

import config from './packages/oxfmt-config/config.mjs';

const oxfmtResolvedConfig: OxfmtConfig = config;
// wbfy:end oxfmt-base

// wbfy:start oxfmt-export
export default oxfmtResolvedConfig;
// wbfy:end oxfmt-export
