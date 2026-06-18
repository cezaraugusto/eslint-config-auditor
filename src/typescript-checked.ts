// Rules are adapted from https://github.com/kaisermann/kiwi
// MIT License. Christian Kaisermann <https://github.com/kaisermann>
import type { Linter } from 'eslint';
import nodePlugin from 'eslint-plugin-n';
import typescript from './typescript';

const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

// Type-aware TypeScript config: the default `typescript` config plus the
// typescript-eslint project service and the rules that require type
// information. Every linted `.ts`/`.tsx` file must be covered by a tsconfig
// `include`; loose root-level config files (`*.config.ts`, etc.) are allowed
// via `allowDefaultProject`. Compose like the base config, e.g.
// `[...recommended, ...finest, ...typescriptChecked]`.
const typescriptChecked: Linter.Config[] = [
  ...typescript,
  {
    name: 'auditor/typescript-checked',
    files: TS_FILES,
    plugins: {
      node: nodePlugin,
    },
    languageOptions: {
      parserOptions: {
        // `allowDefaultProject` lets loose config files (e.g. a
        // `vitest.config.ts` not listed in any tsconfig `include`) be linted
        // without throwing "not found by the project service". The list is
        // intentionally small: the default project is capped at 8 files by
        // typescript-eslint.
        projectService: {
          allowDefaultProject: ['*.config.ts', '*.config.mts', '*.config.cts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      // Replaces "@typescript-eslint/no-throw-literal", renamed to
      // "only-throw-error" in typescript-eslint v8
      '@typescript-eslint/only-throw-error': 'warn',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        {
          ignoreConditionalTests: true,
          ignoreMixedLogicalExpressions: true,
        },
      ],
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      // Type-aware in eslint-plugin-n v18; re-enabled here where the project
      // service provides type information (off in the syntactic default).
      'node/no-sync': [
        'error',
        {
          allowAtRootLevel: true,
        },
      ],
      'dot-notation': 'off',
    },
  },
];

export default typescriptChecked;
