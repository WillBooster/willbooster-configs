const micromatch = require('micromatch');
module.exports = {
  './**/*.{css,htm,html,js,json,jsx,md,scss,ts,tsx,vue,yaml,yml}': files => {
    const fileList = files.filter(file => !file.includes('/test-fixtures/')).join(' ');
    return fileList ? [`prettier --write ${fileList}`, `git add ${fileList}`] : [];
  },
};
