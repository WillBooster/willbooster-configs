import fs from 'node:fs';

export function readPackageJson(packageJsonPath) {
  if (!packageJsonPath) return;
  try {
    const packageJsonText = fs.readFileSync(packageJsonPath, 'utf8');
    return JSON.parse(packageJsonText);
  } catch {
    // do nothing
  }
}

export function getNamespace(packageJson) {
  const match = /@([^/]+)\//.exec(packageJson.name ?? '');
  const [, namespace] = match ?? [];
  return namespace;
}
