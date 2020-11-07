[npm-image]: https://img.shields.io/npm/v/eslint-config-auditor.svg
[npm-url]: https://npmjs.org/package/eslint-config-auditor

# eslint-config-auditor [![npm][npm-image]][npm-url]

> Shareable ESLint Config to help you write clear, efficient JavaScript code. 😼

Auditor uses sane defaults focused on code readability. The Auditor's philosophy is that good code means easy to understand code.

Along with its own rules, Auditor by default includes battle-tested rules from [`eslint:recommended`](https://eslint.org/docs/rules/), [`plugin:import`](https://github.com/benmosher/eslint-plugin-import), [`plugin:promise`](https://github.com/xjamundx/eslint-plugin-promise), and [`plugin:node`](https://github.com/mysticatea/eslint-plugin-node). Both on browser and Node.js, **Auditor gives you the confidence you need to write efficient JavaScript code**.

Besides linting standard JavaScript code gracefully, Auditor also has first-class support to React, Jest, and TypeScript. See [rules](#rules) about usage.

## Installation

```
npm install --save-dev eslint-config-auditor
```

## Usage

Auditor's shareable config is meant to be the source of rules for another application (yet to be built), but as a shareable config, you can use it the same way by installing its peer dependencies.

```
npm install --save-dev eslint-plugin-{import,promise,node}
```

Will install [import](https://github.com/benmosher/eslint-plugin-import), [promise](https://github.com/xjamundx/eslint-plugin-promise), and [node](https://github.com/mysticatea/eslint-plugin-node) plugins. You can now extend your config as you usually would.

In your `.eslintrc`

```json
{
  "extends": "auditor"
}
```

## Rules

Installing the above adds all default rules for Auditor. Auditor has two main rule configs:

* `auditor/recommended` all the needed rules to write consise JavaScript. Includes all best-practices, Node.js, import, and promise rules. Recommended for most users.
* `auditor/finest` Auditor at its finest. Strict rules for advanced use cases such as code refactors and open-source software where code changes can break infinite clients. Includes the recommended config.

Auditor also offers first-class support to Jest, React, and TypeScript but since these are opinionated tools, you need to activate them for usage manually.

### Jest

Uses [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest).

```
npm install --save-dev eslint-plugin-jest -D
```

```json
{
  "extends": [
    "auditor",
    "auditor/jest"
  ]
}
```

### React

Uses [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react), [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), and [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y).

```
npm install --save-dev eslint-plugin-{react,react-hooks,jsx-a11y} -D
```

```json
{
  "extends": [
    "auditor",
    "auditor/react"
  ]
}
```
### TypeScript

Uses [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), and[`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser).

```
npm install --save-dev @typescript-eslint/{eslint-plugin,parser} -D
```

```json
{
  "extends": [
    "auditor",
    "auditor/typescript"
  ]
}
```

## License

MIT (c) Cezar Augusto.
