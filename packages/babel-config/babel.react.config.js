const config = require('./babel.config.js');
config.presets.push('@babel/preset-react');

/** @type {import('@babel/core').PluginItem} */
const presetEnvConfig = config.presets[0][1];
presetEnvConfig.targets = { esmodules: true };
presetEnvConfig.modules = false;

module.exports = config;
