# oxlint-config

An Oxlint config for WillBooster projects.
This config follows the latest Oxlint config model and enables type-aware TypeScript rules and type-checking diagnostics by default, so `oxlint-tsgolint` is required together with `oxlint`.
It also enables Oxlint's built-in React, React performance, JSX accessibility, and Promise plugins to cover projects that otherwise use `@willbooster/eslint-config-ts-react`.

Install the package and its peer dependencies.

```sh
yarn add -D @willbooster/oxlint-config oxlint oxlint-tsgolint
```

Then extend the shared config from your local `.oxlintrc.json`.

```json
{
  "extends": ["./node_modules/@willbooster/oxlint-config/.oxlintrc.jsonc"]
}
```

Run Oxlint as usual.

```sh
oxlint .
```

To debug this shared config from this repository, run it against the local fixture project.

```sh
npx -y -p oxlint@1.60.0 -p oxlint-tsgolint@0.18.1 oxlint --type-aware --type-check -c packages/oxlint-config/.oxlintrc.jsonc packages/oxlint-config
```
