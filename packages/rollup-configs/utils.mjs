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

export function getNamespaceAndName(packageJson) {
  const match = /@([^/]+)\/(.+)/.exec(packageJson.name || '');
  const [, namespace, name] = match || [];
  return [namespace, name];
}
