import path from 'node:path';

const forbiddenKeys = new Set(['hostRules', 'npmrc', 'npmToken']);
const placeholderPattern = /\{\{\s*(?:secrets|variables)\./;
// Only Renovate's built-in presets (`:name` or `group:name`) are allowed: a repository, npm, relative,
// or URL preset could re-import the credentials that renovate-base.jsonc must stay free of.
const builtInPresetPattern = /^[a-z]*:[A-Za-z][\w-]*(?:\(.*\))?$/;

async function main(): Promise<void> {
  const filePath = path.resolve(process.argv[2] ?? 'renovate-base.jsonc');
  const module: { default: unknown } = await import(filePath);
  const problems = findProblems(module.default, '');
  if (problems.length === 0) return;
  for (const problem of problems) {
    console.error(`::error::${path.basename(filePath)}: ${problem}; put credentials in renovate.jsonc`);
  }
  process.exit(1);
}

function findProblems(value: unknown, valuePath: string): string[] {
  if (typeof value === 'string') {
    return placeholderPattern.test(value) ? [`${valuePath} contains a secret or variable placeholder`] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findProblems(item, `${valuePath}[${index}]`));
  }
  if (value === null || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => {
    const childPath = valuePath ? `${valuePath}.${key}` : key;
    const problems = findProblems(child, childPath);
    if (forbiddenKeys.has(key)) problems.unshift(`${childPath} must not be set`);
    if (key === 'extends' && Array.isArray(child)) {
      for (const preset of child) {
        if (typeof preset !== 'string' || !builtInPresetPattern.test(preset)) {
          problems.unshift(`${childPath} may only list built-in presets, found ${JSON.stringify(preset)}`);
        }
      }
    }
    return problems;
  });
}

await main();
