// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import jestPlugin from 'eslint-plugin-jest';

const jest: Linter.Config[] = [
  // Equivalent of the legacy "plugin:jest/recommended" preset
  jestPlugin.configs['flat/recommended'] as Linter.Config,
  // Equivalent of the legacy "plugin:jest/style" preset
  jestPlugin.configs['flat/style'] as Linter.Config,
  {
    name: 'auditor/jest',
    rules: {
      'jest/consistent-test-it': [
        'warn',
        {
          fn: 'test',
          withinDescribe: 'it',
        },
      ],
      'jest/no-alias-methods': 'off',
      'jest/no-deprecated-functions': 'error',
      'jest/no-duplicate-hooks': 'error',
      // "jest/no-if" was replaced by "jest/no-conditional-in-test"
      'jest/no-conditional-in-test': 'off',
      'jest/no-test-return-statement': 'off',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-spy-on': 'warn',
      'jest/prefer-todo': 'warn',
    },
  },
];

export default jest;
