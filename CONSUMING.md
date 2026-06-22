# Consuming `eslint-config-auditor`

Copy-paste recipes for adding Auditor to a project. Every recipe assumes a flat
config file (`eslint.config.js`, `.mjs`, or `.cjs`).

## Prerequisites

- **ESLint `>=10`.** Auditor's peer range starts at 10. Bump first:
  `npm i -D eslint@^10` (and remove any standalone plugin packages; Auditor
  bundles them).
- **Node `^20.19.0 || ^22.13.0 || >=24`.** Update CI runners accordingly.
- Run ESLint from the **repo root** so type-aware linting resolves tsconfig and
  `allowDefaultProject` globs correctly (see TypeScript notes).

## Recipes by project type

### Plain JavaScript / Node CLI library

```js
// eslint.config.js
import auditor from 'eslint-config-auditor'

export default auditor // recommended + finest
```

Covers `**/*.js`, `**/*.mjs`, `**/*.cjs`, and `**/*.jsx`.

### TypeScript library (most common here)

```js
// eslint.config.js
import ts from 'eslint-config-auditor/ts'

export default ts // recommended + finest + typescript, one import
```

`...auditor` alone does **not** lint `.ts`/`.tsx` files; the base config only
attaches to JavaScript extensions. Use the `ts` preset (or spread
`[...auditor, ...typescript]`) so TypeScript files are matched and type-aware
rules run. A `tsconfig.json` at the repo root is required.

### React (component libraries / SPAs)

> The dedicated `react` config (`eslint-plugin-react`) does **not** work on
> ESLint 10 yet; several of its rules call APIs ESLint 10 removed. Until
> upstream ships a fix, use the base config only:

```js
// eslint.config.js: TS + React, interim
import ts from 'eslint-config-auditor/ts'

export default ts
```

You still get JSX parsing, `@stylistic/jsx-quotes` (double), and all
best-practice rules. You temporarily lose `react/*`, `react-hooks/*`, and
`jsx-a11y/*`. Re-add `eslint-config-auditor/react` once it's unblocked.

### Next.js apps

Keep `eslint-config-next` for framework rules and layer Auditor for the rest:

```js
// eslint.config.js
import auditor from 'eslint-config-auditor'
// ...plus your Next flat config
export default [...auditor]
```

(Skip the `react` config; same ESLint 10 limitation as above.)

### Jest projects

```js
import auditor from 'eslint-config-auditor'
import jest from 'eslint-config-auditor/jest'

export default [
  ...auditor,
  { files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'], extends: [jest] },
]
```

Vitest projects don't need a special config; just use `auditor`/`ts`.

### Repos that already use Biome

Auditor's `@stylistic` formatting was aligned to the Biome house style (single
quotes, no semicolons, no trailing commas, no bracket spacing, 80 columns,
always-parenthesized arrow params), so the two mostly agree. Keep Biome as the
formatter and Auditor as the linter; run `biome format` **before**
`eslint --fix`. Auditor adds value Biome doesn't (blank lines around `if`,
best-practice/import/promise/node rules).

## TypeScript / `projectService` notes

The `typescript` config uses `projectService` for type-aware linting:

- **Every linted `.ts`/`.tsx` file must be covered by a `tsconfig.json`**
  (`include`). Files outside it throw *"not found by the project service."*
- Loose **root-level** config files (`*.config.ts`, `*.config.mts`,
  `*.config.cts`) are allowed without a tsconfig entry via
  `allowDefaultProject`. These globs match **relative to `tsconfigRootDir`**
  (the dir ESLint runs from), so they only cover config files at the repo root.
- If you run ESLint from a subdirectory, set
  `languageOptions.parserOptions.tsconfigRootDir` in your own config.
- For other stray `.ts` files (e.g. `scripts/*.ts`), either add them to a
  tsconfig `include` or scope Auditor's TS config away from them.

## File-size cap

`finest` caps files at **350 lines of code** (blanks/comments excluded).
Exempt by glob: `*.config.*`, `*.d.ts`, `*.generated.*`, `generated/**`,
`*.json`, and tests (`*.test.*`, `*.spec.*`, `__tests__/**`, `__spec__/**`).
Need another exemption? Add a trailing config entry:

```js
export default [
  ...auditor,
  { files: ['**/legacy/**'], rules: { 'max-lines': 'off' } },
]
```

## Subpath exports

| Import | Contents |
| --- | --- |
| `eslint-config-auditor` | `recommended` + `finest` (default) |
| `eslint-config-auditor/ts` | `recommended` + `finest` + `typescript` |
| `eslint-config-auditor/recommended` | base best-practice + formatting rules |
| `eslint-config-auditor/finest` | strict layer (size caps, complexity) |
| `eslint-config-auditor/typescript` | TypeScript parser + rules (`.ts`/`.tsx`) |
| `eslint-config-auditor/jest` | Jest test rules |
| `eslint-config-auditor/react` | React rules (**experimental on ESLint 10**) |
