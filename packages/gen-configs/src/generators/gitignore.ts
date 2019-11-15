import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs-extra';
import { IgnoreFileUtil } from '../utils/ignoreFileUtil';
import { PackageConfig } from '../types/packageConfig';

const names = ['node', 'jetbrains', 'visualstudiocode', 'vim', 'windows', 'macos'];

export async function generateGitignore(config: PackageConfig): Promise<void> {
  let content = `${IgnoreFileUtil.header}

dist/
temp/

${IgnoreFileUtil.separator}
`;
  const filePath = path.resolve(config.dirPath, '.gitignore');
  content = IgnoreFileUtil.getUserContent(filePath) || content;
  for (const name of names) {
    const response = await fetch(`https://www.gitignore.io/api/${name}`);
    content += await response.text();
  }
  await fs.outputFile(filePath, content);
  console.log(`Generated ${filePath}`);
}
