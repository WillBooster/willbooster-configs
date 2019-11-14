import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import glob from 'glob';
import { generateGitignore } from './generators/gitignore';
import { generatePrettierignore } from './generators/prettierignore';
import { generateHuskyrc } from './generators/huskyrc';
import { PackageConfig } from './types/packageConfig';
import { generateLintstagedrc } from './generators/lintstagedrc';
import { generateEditorconfig } from './generators/editorconfig';
import { generateYarnrc } from './generators/yarnrc';
import { generateLernaJson } from './generators/lernaJson';
import { generateTsconfig } from './generators/tsconfig';
import { generateDependabotConfig } from './generators/dependabot';
import { generateEslintrc } from './generators/eslintrc';
import { generateEslintignore } from './generators/eslintignore';
import { generatePackageJson } from './generators/packageJson';

async function main(): Promise<void> {
  const argv = require('yargs').argv;

  for (const rootDirPath of argv._) {
    const rootConfig = getPackageConfig(rootDirPath);
    if (rootConfig == null) {
      console.error(`there is no valid package.json in ${rootDirPath}`);
      continue;
    }

    const subDirPaths = rootConfig.containingPackages
      ? glob.sync('packages/*', { cwd: rootDirPath }).map(subDirPath => path.resolve(rootDirPath, subDirPath))
      : [];
    const allDirPaths = [rootDirPath, ...subDirPaths];

    const subPackageConfigs = subDirPaths.map(subDirPath => getPackageConfig(subDirPath));
    const allPackageConfigs = [rootConfig, ...subPackageConfigs];
    const nonNullPackageConfigs = allPackageConfigs.filter(config => !!config) as PackageConfig[];

    rootConfig.containingJavaScript =
      rootConfig.containingJavaScript || nonNullPackageConfigs.some(c => c.containingJavaScript);
    rootConfig.containingTypeScript =
      rootConfig.containingTypeScript || nonNullPackageConfigs.some(c => c.containingTypeScript);
    rootConfig.containingJsxOrTsx =
      rootConfig.containingJsxOrTsx || nonNullPackageConfigs.some(c => c.containingJsxOrTsx);

    generateEditorconfig(rootDirPath);
    generateHuskyrc(rootDirPath, rootConfig);
    generateLintstagedrc(rootDirPath);
    generateYarnrc(rootDirPath);
    if (rootConfig.containingPackages) {
      generateLernaJson(rootDirPath);
    }
    generateDependabotConfig(rootDirPath);

    for (let i = 0; i < allDirPaths.length; i++) {
      const dirPath = allDirPaths[i];
      const config = allPackageConfigs[i];
      if (!config) continue;

      console.log(dirPath, config);

      await generateGitignore(dirPath);
      await generatePrettierignore(dirPath);
      if (rootConfig.containingTypeScript) {
        generateTsconfig(rootDirPath, rootConfig);
      }
      if (config.containingJavaScript || config.containingTypeScript) {
        await generateEslintrc(dirPath, config, rootConfig);
        await generateEslintignore(dirPath);
      }
    }
    for (let i = 0; i < allDirPaths.length; i++) {
      const dirPath = allDirPaths[i];
      const config = allPackageConfigs[i];
      if (!config) continue;

      await generatePackageJson(dirPath, config, nonNullPackageConfigs);
    }
    child_process.exec('yarn format', { cwd: rootDirPath });
  }
}

function getPackageConfig(dirPath: string): PackageConfig | null {
  const packageJsonPath = path.resolve(dirPath, 'package.json');
  const packageJsonText = fs.readFileSync(packageJsonPath).toString();
  try {
    const packageJson = JSON.parse(packageJsonText);
    if (!packageJson) {
      return null;
    }

    const dependencies = packageJson.dependencies || {};
    return {
      root:
        path.basename(path.resolve(dirPath, '..')) != 'packages' ||
        !fs.existsSync(path.resolve(dirPath, '..', '..', 'package.json')),
      willBoosterConfigs: packageJsonPath.includes(`${path.sep}willbooster-configs`),
      containingPackages: glob.sync('packages/**/package.json', { cwd: dirPath }).length > 0,
      containingJavaScript: glob.sync('src/**/*.js?(x)', { cwd: dirPath }).length > 0,
      containingTypeScript: glob.sync('src/**/*.ts?(x)', { cwd: dirPath }).length > 0,
      containingJsxOrTsx: glob.sync('src/**/*.(t|j)sx', { cwd: dirPath }).length > 0,
      depending: {
        tsnode: !!dependencies['tsnode'],
      },
    };
  } catch (e) {
    return null;
  }
}

main();
