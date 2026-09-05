import path from 'node:path';

const forbiddenKeys = new Set(['hostRules', 'npmrc', 'npmToken']);
const placeholderPattern = /\{\{\s*(?:secrets|variables)\./;
// Only Renovate's built-in presets without arguments are allowed: a repository, npm, relative, or URL
// preset could re-import the credentials that renovate-base.jsonc must stay free of, and a built-in
// that takes an argument can inject one (`:githubComToken(token)` expands to a hostRules entry).
// These are the namespaces that actually hold built-in presets (plus the bare `:name` form of
// `default`); any other `name:preset` is either an npm package or an unresolvable reference.
// Built-in names may contain dots and spaces (e.g. `monorepo:system.io.abstractions`), but never `/`,
// `>`, `:`, or parentheses, which are what repository, URL, and parameterized references contain.
const builtInPresetPattern =
  /^(?:|abandonments|config|customManagers|default|docker|global|group|helpers|mergeConfidence|monorepo|packages|preview|replacements|schedule|security|workarounds):[A-Za-z][^\s/>:()][^/>:()]*$/;
// The only built-ins whose definitions contain hostRules; they expand to one even without an argument.
const hostRulesBuiltInPresets = new Set(['githubComToken', 'disableHost', 'disableDomain']);

async function main(): Promise<void> {
  const filePath = path.resolve('renovate-base.jsonc');
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
    if (key === 'extends') {
      // Renovate also accepts a single preset string here.
      for (const preset of Array.isArray(child) ? child : [child]) {
        if (typeof preset !== 'string' || !builtInPresetPattern.test(preset)) {
          problems.unshift(`${childPath} may only list built-in presets, found ${JSON.stringify(preset)}`);
        } else if (hostRulesBuiltInPresets.has(preset.replace(/^(?:default)?:/, ''))) {
          problems.unshift(`${childPath} must not list ${preset}, which expands to hostRules`);
        }
      }
    }
    return problems;
  });
}

await main();
