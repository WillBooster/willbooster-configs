import path from 'path';
import fs from 'fs-extra';

const content = `root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,jsx,ts,tsx,json,cpp}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
`;

export async function generateEditorconfig(dirPath: string): Promise<void> {
  const filePath = path.resolve(dirPath, '.editorconfig');
  return fs.outputFile(filePath, content);
}
