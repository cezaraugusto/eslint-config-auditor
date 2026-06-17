# Migration: 1.0.0 (ESLint 9) → 2.0.0 (ESLint 10, @stylistic)

Version 2.0.0 targets **ESLint 10** and moves every formatting/stylistic rule
out of ESLint core (where they are deprecated and being removed) into
[`@stylistic/eslint-plugin`](https://eslint.style). All rule severities and
options are unchanged; only the rule namespace changed. The full dependency set
was also bumped to current majors.

## Requirements

| | 1.0.0 | 2.0.0 |
| --- | --- | --- |
| `eslint` (peer) | `>=9` | `>=10` |
| Node.js | `>=18.18.0` | `^20.19.0 \|\| ^22.13.0 \|\| >=24` |

## Dependency bumps

| Package | 1.0.0 | 2.0.0 |
| --- | --- | --- |
| `@stylistic/eslint-plugin` | — | `^5.10.0` (new) |
| `eslint-plugin-import` → `eslint-plugin-import-x` | `^2.31.0` | `^4.16.2` |
| `eslint-plugin-jest` | `^28.11.0` | `^29.15.2` |
| `eslint-plugin-n` | `^17.17.0` | `^18.1.0` |
| `eslint-plugin-promise` | `^7.2.1` | `^7.3.0` |
| `eslint-plugin-react-hooks` | `^5.2.0` | `^7.1.1` |
| `globals` | `^16.0.0` | `^17.6.0` |
| `typescript-eslint` | `^8.31.0` | `^8.61.0` |

`eslint-plugin-jsx-a11y` (`^6.10.2`) and `eslint-plugin-react` (`^7.37.5`) were
already at their latest releases and are unchanged.

### `eslint-plugin-import` → `eslint-plugin-import-x`

`eslint-plugin-import@2.32.0` (its latest release) crashes on ESLint 10: its
`import/order` rule calls `sourceCode.getTokenOrCommentAfter`, an API ESLint 10
removed, throwing on any multi-group import block. Auditor switched to the
actively maintained fork [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x),
which supports ESLint `^8.57 || ^9 || ^10`. It is a drop-in: the same `import/*`
rule names and `flatConfigs` are used and the plugin is still registered under
the `import` namespace, so rule config and inline `// eslint-disable import/...`
directives are unchanged.

## Formatting rules moved to `@stylistic`

The 57 core formatting rules used by `recommended`/`finest` (`indent`, `quotes`,
`semi`, `comma-dangle`, `brace-style`, `object-curly-spacing`, …) are now
configured under the `@stylistic/` namespace and the plugin is registered as
`@stylistic`. Severities and options are identical. Two notes:

- `func-call-spacing` was renamed to `@stylistic/function-call-spacing` (the
  name `@stylistic` ships it under).
- `object-property-newline`'s deprecated `allowMultiplePropertiesPerLine` option
  was replaced by the equivalent `allowAllPropertiesOnSameLine` (the only name
  `@stylistic` accepts).

`lines-around-directive` and `unicode-bom` have no `@stylistic` equivalent and
remain core rules. If you have inline `// eslint-disable` directives that target
a moved rule by its old core name, update the prefix (e.g. `indent` →
`@stylistic/indent`).

## New and changed rules in 2.0.0

These harden the config and align it with the [Extension.js](https://extension.js.org)
house style (Extension.js itself is formatter-only via Biome; these encode the
same conventions as enforceable lint rules and tighten them):

| Rule | 1.0.0 | 2.0.0 | Why |
| --- | --- | --- | --- |
| `@stylistic/jsx-quotes` | `prefer-single` | `prefer-double` | Matches Extension.js (`jsxQuoteStyle: "double"`). |
| `@stylistic/arrow-parens` | (not set) | `['error', 'always']` | Matches Extension.js (`arrowParentheses: "always"`). |
| `@stylistic/padding-line-between-statements` | `warn` | `error`, plus blank lines required before **and** after every `if` block | Requested. First-in-block `if`s are exempt; an `if` immediately followed by `return` is left tight (the rule is ordered last so it wins over the `block-like → return` rules). |
| `max-lines` (`finest`) | `['warn', 500]` | `['error', { max: 350, skipBlankLines: true, skipComments: true }]` | Requested 350-LOC cap. A new `auditor/finest-large-by-nature` config entry turns it off for `*.config.*`, `*.d.ts`, `*.generated.*`, `generated/**`, `*.json`, and test/spec files (`*.test.*`, `*.spec.*`, `__tests__/**`, `__test__/**`, `__spec__/**`). |

Two `@stylistic` option deprecations carried over from core were also corrected
(no behavior change): `line-comment-position`'s `applyDefaultPatterns` →
`applyDefaultIgnorePatterns`, and `quotes`' `allowTemplateLiterals: false` →
`'never'`.

## Consumer ergonomics added in 2.0.0

- **`eslint-config-auditor/ts`** — a new preset equal to
  `recommended` + `finest` + `typescript`, so TypeScript projects need a single
  import. (`...auditor` alone never linted `.ts`/`.tsx`; the base config only
  attaches to JavaScript extensions.)
- **`.jsx` files are now linted by the base config** (`auditor/recommended-jsx`).
  Previously they matched no config and were silently skipped.
- **`projectService.allowDefaultProject`** now lists `*.config.ts`,
  `*.config.mts`, and `*.config.cts`, so a root-level config file outside the
  tsconfig `include` lints instead of throwing "not found by the project
  service."

See [CONSUMING.md](./CONSUMING.md) for per-project-type setup recipes.

## Known limitation: the `react` config on ESLint 10

`eslint-plugin-react` (≤ `7.37.5`, the latest release) calls
`context.getFilename()`/`context.getScope()`, which ESLint 10 removed, so
several of its rules throw at lint time. The `react` export is therefore
**experimental** on ESLint 10 and will resume working once `eslint-plugin-react`
publishes an ESLint 10 compatible release — no change to this package will be
required. All other configs work on ESLint 10. (On ESLint 9 the `react` config
still works, but this package's peer range now starts at `>=10`.)

---

# Migration: 0.x (eslintrc, ESLint 8) → 1.0.0 (flat config, ESLint 9)

Version 1.0.0 ports every config to the ESLint 9 flat config format. The rule
set and severities were kept identical wherever the rule still exists in
ESLint 9 / the current plugin majors. This document records every rule that
could not be ported verbatim.

## Plugin replacements

| 0.x package | 1.0.0 package | Notes |
| --- | --- | --- |
| `eslint-plugin-node` (^11) | `eslint-plugin-n` (^17) | Maintained fork, ESLint 9 compatible. The `node/` rule prefix is preserved via the flat-config plugin namespace, so existing inline directives keep working. |
| `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin` (^5) | `typescript-eslint` (^8) | Flat-config-native package providing parser and plugin. |
| (env/globals via eslintrc `env`) | `globals` (^16) | `env: { es2021, node }` became `languageOptions.globals` with `globals.es2021` + `globals.node`. |

All plugins are now regular dependencies of this package; consumers no longer
install them separately.

## Renamed or dropped rules

| Old rule (0.x) | Disposition in 1.0.0 |
| --- | --- |
| `node/shebang` ("error") | Renamed → `node/hashbang` ("error") (renamed in eslint-plugin-n v17). |
| `no-process-env` ("off", finest) | Dropped. Removed from ESLint core; the equivalent `node/no-process-env` is already configured "off" in `recommended`. |
| `import/exports-last` (["error", "never"], finest) | Kept as `import/exports-last` ("error"). The rule takes no options; the stray `"never"` option in 0.x was invalid and was dropped. |
| `jest/no-expect-resolves` ("error") | Dropped. Removed in eslint-plugin-jest v25 with no replacement. |
| `jest/no-if` ("off") | Replaced → `jest/no-conditional-in-test` ("off") (its designated successor). |
| `jest/no-truthy-falsy` ("off") | Dropped. Removed in eslint-plugin-jest v25 (it was disabled anyway). |
| `@typescript-eslint/ban-types` ("error", banning `Boolean`/`Number`/`String`/`Symbol`) | Replaced → `@typescript-eslint/no-wrapper-object-types` ("error"), the typescript-eslint v8 successor covering exactly those wrapper types. |
| `@typescript-eslint/no-empty-interface` ("error") | Replaced → `@typescript-eslint/no-empty-object-type` ("error"), the typescript-eslint v8 successor. |
| `@typescript-eslint/no-throw-literal` ("warn") | Renamed → `@typescript-eslint/only-throw-error` ("warn") (renamed in typescript-eslint v8). |
| `@typescript-eslint/quotes` (["error", "single"]) | Dropped. Formatting rules were removed from typescript-eslint v8 (moved to `@stylistic/eslint-plugin`). The core `quotes` rule from `recommended` still enforces single quotes. |

## Changed rule options

| Rule | Change |
| --- | --- |
| `@typescript-eslint/restrict-plus-operands` | `checkCompoundAssignments` option removed upstream (compound assignments are now always checked). Now configured as plain "error". |
| `@typescript-eslint/prefer-nullish-coalescing` | `forceSuggestionFixer` option removed upstream. Remaining options (`ignoreConditionalTests`, `ignoreMixedLogicalExpressions`) kept. |

## Config-shape translations (no behavior change intended)

| 0.x (eslintrc) | 1.0.0 (flat config) |
| --- | --- |
| `env: { es2021: true, node: true }` | `languageOptions.globals` from the `globals` package. |
| `parserOptions` (`ecmaVersion`, `sourceType`, `ecmaFeatures.jsx`) | `languageOptions` / `languageOptions.parserOptions`. |
| `parser: "@typescript-eslint/parser"` + `parserOptions.project` globs + `projectFolderIgnoreList` | `languageOptions.parser` from `typescript-eslint` + `parserOptions.projectService: true` (automatic tsconfig discovery). |
| `extends: "plugin:jest/recommended"`, `"plugin:jest/style"` | `jestPlugin.configs['flat/recommended']`, `['flat/style']`. |
| `extends: "plugin:react/recommended"` | `reactPlugin.configs.flat.recommended`. |
| `extends: "plugin:jsx-a11y/recommended"` | `jsxA11yPlugin.flatConfigs.recommended`. |
| `extends: "plugin:react-hooks/recommended"` | Inlined: `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps` were the preset's only rules and were already overridden to "error" in 0.x. |
| `extends: "plugin:@typescript-eslint/eslint-recommended"` + `"recommended"` | `tseslint.configs.recommended` (includes eslint-recommended), scoped to `**/*.ts`/`**/*.tsx`/`**/*.mts`/`**/*.cts`. |
| `extends: "plugin:import/typescript"` | `importPlugin.flatConfigs.typescript` settings/rules, scoped to TS files. |
| `overrides` (TS config) | Separate flat config array entries with `files` patterns. |
| `settings.react.version: "latest"` | `settings.react.version: "detect"` ("latest" was never a valid value; "detect" is the supported equivalent). |
| finest's top-level stray `object-shorthand` key (invalid JSON placement in 0.x) | Folded into `rules` (same value `recommended` already uses). |

## Deprecation notice

The core formatting/stylistic rules used by `recommended` (`indent`, `quotes`,
`semi`, `comma-dangle`, etc.) are deprecated in ESLint 9 in favor of
`@stylistic/eslint-plugin`, but they still function in ESLint 9 and are kept
for a faithful port. They are expected to be migrated to `@stylistic` in a
future major of this package.
