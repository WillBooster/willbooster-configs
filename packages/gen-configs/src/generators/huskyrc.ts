import path from 'path';
import fs from 'fs-extra';
import merge from 'deepmerge';
import { PackageConfig } from '../types/packageConfig';

function generateJsonObj(): any {
  return {
    hooks: {
      'pre-commit': 'lint-staged',
      'pre-push': 'yarn typecheck',
    },
  };
}

export async function generateHuskyrc(dirPath: string, config: PackageConfig): Promise<void> {
  let jsonObj = generateJsonObj();
  if (!config.containingTypeScript) {
    delete jsonObj.hooks['pre-push'];
  }

  const filePath = path.resolve(dirPath, '.huskyrc.json');
  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath).toString();
    try {
      const existingJsonObj = JSON.parse(existingContent);
      jsonObj = merge(existingJsonObj, jsonObj);
    } catch (e) {
      // do nothing
    }
  }
  return fs.outputFile(filePath, JSON.stringify(jsonObj));
}
