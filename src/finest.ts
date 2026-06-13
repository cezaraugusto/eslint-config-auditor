// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import importPlugin from './import-plugin';

const finest: Linter.Config[] = [
  {
    name: 'auditor/finest',
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      node: nodePlugin,
      promise: promisePlugin,
    },
    rules: {
      complexity: ['warn', 10],
      'func-names': 'warn',
      'max-lines': ['warn', 500],
      'max-lines-per-function': [
        'warn',
        {
          max: 45,
          skipComments: true,
        },
      ],
      'max-nested-callbacks': ['warn', 6],
      'max-params': ['warn', 3],
      'max-statements-per-line': [
        'warn',
        {
          max: 1,
        },
      ],
      'no-await-in-loop': 'warn',
      'no-console': [
        'off',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],
      'no-promise-executor-return': 'error',
      'node/no-unpublished-bin': 'warn',
      'node/no-unpublished-import': 'warn',
      'node/no-unpublished-require': 'warn',
      'node/prefer-promises/dns': 'warn',
      'node/prefer-promises/fs': 'warn',
      'promise/prefer-await-to-callbacks': 'warn',
      'promise/prefer-await-to-then': 'warn',
      'prefer-arrow-callback': [
        'warn',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'node/no-unsupported-features/es-syntax': 'warn',
      'node/no-missing-import': 'warn',
      'import/no-relative-parent-imports': 'warn',
      'node/no-unsupported-features/node-builtins': 'warn',
      'no-duplicate-imports': 'warn',
      'import/exports-last': 'error',
      'node/no-callback-literal': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/alt-text': 'error',
      'array-callback-return': [
        'error',
        {
          allowImplicit: false,
          checkForEach: false,
        },
      ],
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: true,
          ignoreConstructors: false,
        },
      ],
    },
  },
];

export default finest;
