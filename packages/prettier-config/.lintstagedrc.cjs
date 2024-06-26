const path = require('path');

module.exports = {
  './**/*.{cjs,css,cts,htm,html,js,json,json5,jsonc,jsx,md,mjs,mts,scss,ts,tsx,vue,yaml,yml}': (files) => {
    let filteredFiles = files.filter((file) => !file.includes('/test-fixtures/'));
    if (filteredFiles.length === 0) return [];
    const commands = [`node ../../node_modules/.bin/prettier --cache --write ${filteredFiles.join(' ')}`];
    if (filteredFiles.some((file) => file.endsWith('package.json'))) {
      commands.push('node ../../node_modules/.bin/sort-package-json');
    }
    return commands;
  },
};
