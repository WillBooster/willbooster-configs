import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';

const names = ['node', 'intellij', 'visualstudiocode', 'vim', 'windows', 'macos'];

export async function generateGitignore(dirPath: string) {
  let content = `# Project-specific settings

`;
  const filePath = path.resolve(dirPath, '.gitignore');
  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath).toString();
    const index = existingContent.indexOf('# Created by');
    if (index >= 0) {
      content = existingContent.substr(0, index).trim() + '\n\n';
    }
  }
  for (const name of names) {
    const response = await fetch(`https://www.gitignore.io/api/${name}`);
    content += await response.text();
  }
  return fs.outputFile(filePath, content);
}
