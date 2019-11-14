import fs from 'fs-extra';

const separatorPrefix = '# Generated by @willbooster';

export const IgnoreFileUtil = {
  header: '# Project-specific settings',
  separator: '# Generated by @willbooster/gen-configs',
  getExistingContent(filePath: string): string | null {
    if (fs.existsSync(filePath)) {
      return fs
        .readFileSync(filePath)
        .toString()
        .replace(/# Project-specific settings[^\n]*\n/m, '')
        .replace(/# Generated by[^\n]*\n/m, '');
    }
    return null;
  },
  getUserContent(filePath: string): string | null {
    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath).toString();
      const index = existingContent.indexOf(separatorPrefix);
      if (index >= 0) {
        return existingContent.substr(0, existingContent.indexOf('\n', index) + 1);
      }
    }
    return null;
  },
};
