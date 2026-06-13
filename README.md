[npm-image]: https://img.shields.io/npm/v/eslint-config-auditor.svg
[npm-url]: https://npmjs.org/package/eslint-config-auditor

# eslint-config-auditor [![npm][npm-image]][npm-url]

> Shareable ESLint flat config to help you write clear, efficient JavaScript code. 😼

Auditor uses sane defaults focused on code readability. The Auditor's philosophy is that good code means easy to understand code.

Along with its own rules, Auditor by default includes battle-tested rules from [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import), [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise), and [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n). Both on browser and Node.js, **Auditor gives you the confidence you need to write efficient JavaScript code**.

Besides linting standard JavaScript code gracefully, Auditor also has first-class support for React, Jest, and TypeScript. See [rules](#rules) about usage.

Version 1.0.0 targets **ESLint 9+ and the flat config format** (`eslint.config.js`). All plugins ship as regular dependencies, so installing this package is all you need.

## Installation

```
npm install --save-dev eslint eslint-config-auditor
```

Requires ESLint `>=9` and Node.js `>=18.18.0`.

## Usage

In your `eslint.config.js` (or `eslint.config.mjs`):

```js
import auditor from 'eslint-config-auditor';

export default [...auditor];
```

The default export is the equivalent of the old root config: `recommended` + `finest` combined.

CommonJS (`eslint.config.cjs`) works too:

```js
const auditor = require('eslint-config-auditor').default;

module.exports = [...auditor];
```

## Rules

Auditor has two main rule configs, available as named exports and subpath imports:

* `recommended` all the needed rules to write concise JavaScript. Includes all best-practices, Node.js, import, and promise rules. Recommended for most users.
* `finest` Auditor at its finest. Strict rules for advanced use cases such as code refactors and open-source software where code changes can break infinite clients. Use it on top of `recommended`.

```js
// eslint.config.js
import recommended from 'eslint-config-auditor/recommended';
import finest from 'eslint-config-auditor/finest';

export default [...recommended, ...finest];
```

Auditor also offers first-class support for Jest, React, and TypeScript but since these are opinionated tools, you need to activate them manually.

### Jest

Uses [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest) (already included).

```js
// eslint.config.js
import auditor from 'eslint-config-auditor';
import jest from 'eslint-config-auditor/jest';

export default [
  ...auditor,
  // Scope Jest rules to your test files
  ...jest.map((config) => ({
    ...config,
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
  })),
];
```

### React

Uses [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react), [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), and [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) (already included).

```js
// eslint.config.js
import auditor from 'eslint-config-auditor';
import react from 'eslint-config-auditor/react';

export default [...auditor, ...react];
```

### TypeScript

Uses [`typescript-eslint`](https://typescript-eslint.io) and [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) (already included). Rules are scoped to `**/*.ts`/`**/*.tsx` files and use the [project service](https://typescript-eslint.io/packages/parser/#projectservice) for type-aware linting, so a `tsconfig.json` in your project root is all you need.

```js
// eslint.config.js
import auditor from 'eslint-config-auditor';
import typescript from 'eslint-config-auditor/typescript';

export default [...auditor, ...typescript];
```

All variants can also be pulled from the root entry as named exports:

```js
import { recommended, finest, jest, react, typescript } from 'eslint-config-auditor';
```

## Migrating from 0.x

Version 0.x shipped legacy `.eslintrc` configs for ESLint 8. Version 1.0.0 is a flat-config rewrite for ESLint 9. To migrate:

1. Upgrade to `eslint@>=9` and remove the plugin packages you installed manually for 0.x (`eslint-plugin-import`, `eslint-plugin-promise`, `eslint-plugin-node`, `eslint-plugin-jest`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`). They are now bundled as dependencies of this package.
2. Replace your `.eslintrc`/`.eslintrc.json` with an `eslint.config.js`:

   ```diff
   - { "extends": ["auditor", "auditor/react"] }
   ```

   ```js
   // eslint.config.js
   import auditor from 'eslint-config-auditor';
   import react from 'eslint-config-auditor/react';

   export default [...auditor, ...react];
   ```

3. Note these behavioral changes:
   * `eslint-plugin-node` was replaced by its maintained fork [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n). The `node/` rule prefix is preserved, so inline directives like `// eslint-disable-next-line node/no-sync` keep working. `node/shebang` is now `node/hashbang`.
   * `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin` were replaced by [`typescript-eslint`](https://typescript-eslint.io) v8. The TypeScript config now uses `projectService: true` instead of `parserOptions.project` globs.
   * Environments (`env`) and `parserOptions` were translated to `languageOptions`, with globals provided by the [`globals`](https://www.npmjs.com/package/globals) package.
   * A few rules were removed or renamed upstream. See [MIGRATION.md](./MIGRATION.md) for the complete old-rule → disposition table.

## License

MIT (c) Cezar Augusto.
