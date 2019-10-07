import path from 'path';
import fs from 'fs';
import { generateGitignore } from './gitignore';

function main(): void {
  const argv = require('yargs')
    .alias('l', 'lerna')
    .boolean('l')
    .describe('l', 'Generate configs for a project using lerna')
    .alias('r', 'react')
    .boolean('r')
    .describe('r', 'Generate configs for a project using lerna')
    .argv;

  for (const dirPath of argv._) {
    if (!fs.existsSync(path.resolve(dirPath, 'package.json'))) {
      console.error(`there is no package.json in ${dirPath}`);
      continue;
    }

    const packageJsonText = fs.readFileSync(path.resolve(dirPath, 'package.json')).toString();
    const packageJson = JSON.parse(packageJsonText);
    if (!packageJson || !packageJson.devDependencies) {
      continue;
    }

    const devDependencies = packageJson.devDependencies;
    const typescript = !!devDependencies['typescript'];
    const lerna = !!devDependencies['lerna'];

    generateGitignore(dirPath);
  }
}

main();
