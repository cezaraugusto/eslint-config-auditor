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

All plugins are now regular dependencies of this package , consumers no longer
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
