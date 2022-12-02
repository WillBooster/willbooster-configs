# rollup-configs

A set of rollup config files for my repositories.

## How to add dependencies for rollup.functions.config.mjs

```sh
yarn add -D @willbooster/rollup-configs \
    @rollup/plugin-babel \
    @rollup/plugin-commonjs \
    @rollup/plugin-json \
    @rollup/plugin-node-resolve \
    @rollup/plugin-replace \
    rollup-plugin-node-externals \
    rollup-plugin-terser
```

## How to add dependencies for rollup.library.noBundle.config.mjs

```sh
yarn add -D @willbooster/rollup-configs \
    @rollup/plugin-commonjs \
    @rollup/plugin-json \
    @rollup/plugin-node-resolve \
    @rollup/plugin-replace \
    rollup-plugin-analyzer \
    rollup-plugin-node-externals \
    rollup-plugin-terser \
    rollup-plugin-ts
```
