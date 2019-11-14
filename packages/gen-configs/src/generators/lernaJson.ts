import path from 'path';
import fs from 'fs-extra';
import merge from 'deepmerge';
import { overwriteMerge } from '../utils/mergeUtil';

function generateJsonObj(): any {
  return {
    packages: ['packages/*'],
    version: '1.0.0',
    npmClient: 'yarn',
    useWorkspaces: true,
    publishConfig: {
      access: 'public',
    },
  };
}

export async function generateLernaJson(dirPath: string): Promise<void> {
  let jsonObj = generateJsonObj();

  const filePath = path.resolve(dirPath, 'lerna.json');
  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath).toString();
    try {
      const existingJsonObj = JSON.parse(existingContent) as any;
      const version = existingJsonObj.version;
      jsonObj = merge(existingJsonObj, jsonObj, { arrayMerge: overwriteMerge });
      jsonObj.version = version || jsonObj.version;
    } catch (e) {
      // do nothing
    }
  }
  return fs.outputFile(filePath, JSON.stringify(jsonObj));
}
