import path from 'path';
import fs from 'fs-extra';
import { IgnoreFileUtil } from '../utils/ignoreFileUtil';

const defaultUserContent = `${IgnoreFileUtil.header}


${IgnoreFileUtil.separator}
`;

const commonContent = `
yarn.lock
`;

export async function generatePrettierignore(dirPath: string): Promise<void> {
  const filePath = path.resolve(dirPath, '.prettierignore');
  const userContent = IgnoreFileUtil.getUserContent(filePath) || defaultUserContent;

  const gitignoreFilePath = path.resolve(dirPath, '.gitignore');
  const gitignoreContent = IgnoreFileUtil.getExistingContent(gitignoreFilePath) || '';

  return fs.outputFile(filePath, userContent + commonContent + gitignoreContent);
}
