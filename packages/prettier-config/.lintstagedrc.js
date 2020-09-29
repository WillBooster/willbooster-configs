const path = require('path');

module.exports = {
  './**/*.{css,htm,html,js,json,jsx,md,scss,ts,tsx,vue,yaml,yml}': (files) => {
    const filteredFiles = files
      .filter((file) => !file.includes('/test-fixtures/') && !file.includes('/packages/'))
      .map((file) => path.relative('', file));
    if (filteredFiles.length === 0) return [];
    const commands = [`prettier --write ${filteredFiles.join(' ')}`];
    if (filteredFiles.some((file) => file.endsWith('package.json'))) {
      commands.push('yarn sort-package-json');
    }
    return commands;
  },
};
