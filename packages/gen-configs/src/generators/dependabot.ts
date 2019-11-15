import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import merge from 'deepmerge';
import { combineMerge, overwriteMerge } from '../utils/mergeUtil';

const defaultContent = `version: 1
update_configs:
  - package_manager: 'javascript'
    directory: '/'
    update_schedule: 'live'
    allowed_updates:
      - match:
          update_type: 'all'
    automerged_updates:
      - match:
          dependency_type: 'development'
          update_type: 'all'
      - match:
          dependency_type: 'production'
          update_type: 'semver:minor'
    commit_message:
      prefix: 'chore'
      prefix_development: 'chore'
      include_scope: true
`;

export async function generateDependabotConfig(dirPath: string): Promise<void> {
  let content = defaultContent;

  const subDirPath = path.resolve(dirPath, '.dependabot');
  const filePath = path.join(subDirPath, 'config.yml');
  fs.ensureDirSync(subDirPath);

  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath).toString();
    try {
      let jsonObj = yaml.safeLoad(content);
      const existingJsonObj = yaml.safeLoad(existingContent);
      jsonObj = merge(existingJsonObj, jsonObj, { arrayMerge: combineMerge });
      content = yaml.safeDump(jsonObj);
    } catch (e) {
      // do nothing
    }
  }
  return fs.outputFile(filePath, content);
}
