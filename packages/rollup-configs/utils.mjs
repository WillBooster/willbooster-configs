import fs from 'node:fs';

export function getNamespace(packageJsonPath) {
  const packageJsonText = fs.readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonText);
  const match = /@([^\/]+)\//.exec(packageJson.name ?? '');
  const [, namespace] = match ?? [];
  return namespace;
}
