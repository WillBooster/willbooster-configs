import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs-extra';
import { IgnoreFileUtil } from '../utils/ignoreFileUtil';

const names = ['node', 'jetbrains', 'visualstudiocode', 'vim', 'windows', 'macos'];

export async function generateGitignore(dirPath: string): Promise<void> {
  let content = `${IgnoreFileUtil.header}

dist/
temp/

${IgnoreFileUtil.separator}
`;
  const filePath = path.resolve(dirPath, '.gitignore');
  content = IgnoreFileUtil.getUserContent(filePath) || content;
  for (const name of names) {
    const response = await fetch(`https://www.gitignore.io/api/${name}`);
    content += await response.text();
  }
  return fs.outputFile(filePath, content);
}
