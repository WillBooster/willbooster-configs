# oxlint-config

An Oxlint config for WillBooster projects.
This config follows the latest Oxlint config model and enables type-aware TypeScript rules by default, so `oxlint-tsgolint` is required together with `oxlint`.

Install the package and its peer dependencies.

```sh
yarn add -D @willbooster/oxlint-config oxlint oxlint-tsgolint
```

Then extend the shared config from your local `.oxlintrc.json`.

```json
{
  "extends": ["./node_modules/@willbooster/oxlint-config/.oxlintrc.json"]
}
```

Run Oxlint as usual.

```sh
oxlint .
```
