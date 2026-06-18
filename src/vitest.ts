// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import vitestPlugin from '@vitest/eslint-plugin';
import type { Linter } from 'eslint';

const vitest: Linter.Config[] = [
  // Equivalent of the plugin's "recommended" preset (vitest/* rules).
  vitestPlugin.configs.recommended as Linter.Config,
  // Vitest test globals (describe/it/expect/vi/...). The plugin keeps these in
  // a separate "env" config; jest bundles them into its recommended preset, so
  // include it here to match how the jest config behaves.
  vitestPlugin.configs.env as Linter.Config,
  {
    name: 'auditor/vitest',
    rules: {
      'vitest/consistent-test-it': [
        'warn',
        {
          fn: 'test',
          withinDescribe: 'it',
        },
      ],
      'vitest/no-alias-methods': 'off',
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-conditional-in-test': 'off',
      'vitest/no-test-return-statement': 'off',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/prefer-spy-on': 'warn',
      'vitest/prefer-todo': 'warn',
    },
  },
];

export default vitest;
