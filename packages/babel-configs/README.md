# babel-configs

A set of babel config files for my repositories.
Install `@willbooster/babel-configs` and the peer dependencies required by the config file you use.

## `babel.config.cjs`

```sh
yarn add -D @willbooster/babel-configs \
    @babel/core \
    @babel/plugin-proposal-class-properties \
    @babel/plugin-proposal-numeric-separator \
    @babel/preset-env \
    @babel/preset-typescript \
    babel-plugin-transform-remove-console
```

## `babel.corejs.config.cjs`

This config also requires the optional `core-js` peer dependency.

```sh
yarn add -D @willbooster/babel-configs \
    @babel/core \
    @babel/plugin-proposal-class-properties \
    @babel/plugin-proposal-numeric-separator \
    @babel/preset-env \
    @babel/preset-typescript \
    babel-plugin-transform-remove-console \
    core-js
```

## `babel.react.config.cjs`

This config also requires the optional `@babel/preset-react` peer dependency.

```sh
yarn add -D @willbooster/babel-configs \
    @babel/core \
    @babel/plugin-proposal-class-properties \
    @babel/plugin-proposal-numeric-separator \
    @babel/preset-env \
    @babel/preset-react \
    @babel/preset-typescript \
    babel-plugin-transform-remove-console
```

## `babel.corejs.react.config.cjs`

This config also requires the optional `@babel/preset-react` and `core-js` peer dependencies.

```sh
yarn add -D @willbooster/babel-configs \
    @babel/core \
    @babel/plugin-proposal-class-properties \
    @babel/plugin-proposal-numeric-separator \
    @babel/preset-env \
    @babel/preset-react \
    @babel/preset-typescript \
    babel-plugin-transform-remove-console \
    core-js
```
