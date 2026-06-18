[npm-version-image]: https://img.shields.io/npm/v/eslint-config-auditor.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/eslint-config-auditor
[npm-downloads-image]: https://img.shields.io/npm/dm/eslint-config-auditor.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/eslint-config-auditor
[action-image]: https://github.com/cezaraugusto/eslint-config-auditor/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/eslint-config-auditor/actions

> Shareable ESLint flat config to help you write clear, efficient JavaScript code.

# eslint-config-auditor [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

Auditor uses sane defaults focused on code readability. The Auditor's philosophy is that good code means easy to understand code.

Along with its own rules, Auditor by default includes battle-tested rules from [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x), [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise), and [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n). Both on browser and Node.js, **Auditor gives you the confidence you need to write efficient JavaScript code**.

Besides linting standard JavaScript code gracefully, Auditor also has first-class support for React, Jest, and TypeScript. See [rules](#rules) about usage.

Version 2.0.0 targets **ESLint 10+ and the flat config format** (`eslint.config.js`). All plugins ship as regular dependencies, so installing this package is all you need. The formatting/stylistic rules are provided through [`@stylistic/eslint-plugin`](https://eslint.style) under the `@stylistic/` namespace (ESLint deprecated and is removing these from core).

## Installation

```
npm install --save-dev eslint eslint-config-auditor
```

Requires ESLint `>=10` and Node.js `^20.19.0 || ^22.13.0 || >=24`.

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

### Formatting (opt-in)

Formatting/stylistic rules are **not** part of the default config — most projects
format with Biome or Prettier, and duplicating that in ESLint just creates noise
and conflicts. Opt in with `eslint-config-auditor/stylistic` only if you want
ESLint to own formatting too:

```js
// eslint.config.js — quality rules + ESLint-owned formatting
import auditor from 'eslint-config-auditor';
import stylistic from 'eslint-config-auditor/stylistic';

export default [...auditor, ...stylistic];
```

The `stylistic` config (a hardened superset of the
[Extension.js](https://extension.js.org) house style) enforces: 2-space indent,
single quotes, **double** quotes in JSX, 80-column lines, no semicolons, no
trailing commas, no spaces inside `{ }`, always-parenthesized arrow params
(`(x) => x`), and blank lines surrounding every `if` block.

`finest` additionally caps files at **350 lines of code** (blank lines and
comments excluded). Files that are routinely large by nature are exempt: config
files (`*.config.*`), type declarations (`*.d.ts`), generated files
(`*.generated.*`, `generated/**`), JSON, and test/spec files (`*.test.*`,
`*.spec.*`, `__tests__/**`, `__spec__/**`).

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

### Vitest

Uses [`@vitest/eslint-plugin`](https://www.npmjs.com/package/@vitest/eslint-plugin) (already included). Includes the Vitest test globals (`describe`/`it`/`expect`/`vi`/…), so scope it to your test files just like Jest:

```js
// eslint.config.js
import auditor from 'eslint-config-auditor';
import vitest from 'eslint-config-auditor/vitest';

export default [
  ...auditor,
  // Scope Vitest rules + globals to your test files
  ...vitest.map((config) => ({
    ...config,
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
  })),
];
```

### React

Uses [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react), [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), and [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) (already included).

> [!IMPORTANT]
> **The `react` config is experimental on ESLint 10.** `eslint-plugin-react` (≤ 7.37.5, the latest release) calls `context.getFilename()`/`context.getScope()`, which ESLint 10 removed, so several of its rules throw at lint time. The `react` export will start working again once `eslint-plugin-react` ships an ESLint 10 compatible release — no change to this package will be required. Every other config (`recommended`, `finest`, `jest`, `typescript`) works on ESLint 10 today.

```js
// eslint.config.js
import auditor from 'eslint-config-auditor';
import react from 'eslint-config-auditor/react';

export default [...auditor, ...react];
```

### TypeScript

Uses [`typescript-eslint`](https://typescript-eslint.io) and [`eslint-plugin-import-x`](https://www.npmjs.com/package/eslint-plugin-import-x) (already included). Rules are scoped to `**/*.ts`/`**/*.tsx` files and use the [project service](https://typescript-eslint.io/packages/parser/#projectservice) for type-aware linting, so a `tsconfig.json` in your project root is all you need.

The base config (`recommended`/`finest`) only attaches to JavaScript files, so a TypeScript project must include this config for its `.ts`/`.tsx` files to be linted at all. The `eslint-config-auditor/ts` preset bundles `recommended` + `finest` + `typescript` so you can do it in one import:

```js
// eslint.config.js
import ts from 'eslint-config-auditor/ts';

export default ts;
```

Or compose it yourself:

```js
// eslint.config.js
import auditor from 'eslint-config-auditor';
import typescript from 'eslint-config-auditor/typescript';

export default [...auditor, ...typescript];
```

See [CONSUMING.md](./CONSUMING.md) for copy-paste recipes per project type (JS, TS, React, Next.js, Jest, Biome coexistence) and notes on `projectService`.

All variants can also be pulled from the root entry as named exports:

```js
import { recommended, finest, jest, vitest, react, stylistic, ts, typescript, typescriptChecked } from 'eslint-config-auditor';
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
