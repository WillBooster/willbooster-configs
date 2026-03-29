# oxlint-config

An Oxlint config for WillBooster projects.
This config follows the latest Oxlint config model and enables type-aware TypeScript rules by default.
You need to do the following command to install peer dependencies.

```sh
yarn add -D @willbooster/oxlint-config oxlint oxlint-tsgolint
```

Then extend the shared config from your local `.oxlintrc.json`.

```json
{
  "extends": ["./node_modules/@willbooster/oxlint-config/.oxlintrc.json"]
}
```
