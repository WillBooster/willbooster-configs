module.exports = {
  './**/*.{css,htm,html,js,json,jsx,md,scss,ts,tsx,vue,yaml,yml}': files => {
    const filtered = files.filter(file => !file.includes('/test-fixtures/')).join(' ');
    return filtered ? [`prettier --write ${filtered}`, `git add ${filtered}`] : [];
  },
};
