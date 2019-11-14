import path from 'path';
import fs from 'fs-extra';

const content = `save-prefix ""
`;

export async function generateYarnrc(dirPath: string): Promise<void> {
  const filePath = path.resolve(dirPath, '.yarnrc');
  return fs.outputFile(filePath, content);
}
