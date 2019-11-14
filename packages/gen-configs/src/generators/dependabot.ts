import path from 'path';
import fs from 'fs-extra';

const content = `version: 1
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
  const subDirPath = path.resolve(dirPath, '.dependabot');
  const filePath = path.join(subDirPath, 'config.yml');
  fs.ensureDirSync(subDirPath);
  return fs.outputFile(filePath, content);
}
