import fs from 'node:fs';
import path from 'node:path';

const distPath = path.resolve('dist');
fs.rmSync(distPath, { force: true, recursive: true });
fs.mkdirSync(distPath, { recursive: true });

const packageJsonText = fs.readFileSync('package.json', 'utf8');
const packageJson = JSON.parse(packageJsonText);

const mainPath = packageJson.main;
packageJson.main = mainPath.split('/')[1];
delete packageJson.devDependencies;
fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(packageJson));
fs.writeFileSync(mainPath, '');
