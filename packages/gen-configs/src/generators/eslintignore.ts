import path from 'path';
import fs from 'fs-extra';
import { IgnoreFileUtil } from '../utils/ignoreFileUtil';

const defaultUserContent = `${IgnoreFileUtil.header}


${IgnoreFileUtil.separator}
`;

const commonContent = `
__generated__/
@types/
*.config.js
`;

export async function generateEslintignore(dirPath: string): Promise<void> {
  const filePath = path.resolve(dirPath, '.eslintignore');
  const userContent = IgnoreFileUtil.getUserContent(filePath) || defaultUserContent;

  const gitignoreFilePath = path.resolve(dirPath, '.gitignore');
  const gitignoreContent = IgnoreFileUtil.getExistingContent(gitignoreFilePath) || '';

  return fs.outputFile(filePath, userContent + commonContent + gitignoreContent);
}
