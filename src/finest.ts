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
      'max-lines': [
        'error',
        {
          max: 350,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-lines-per-function': [
        'warn',
        {
          max: 45,
          skipComments: true,
        },
      ],
      'max-nested-callbacks': ['warn', 6],
      'max-params': ['warn', 3],
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
  {
    // The 350-line cap targets hand-written source. Config files, generated
    // output, type declarations, data files (JSON), and test/spec files are
    // routinely large by nature, so the limit is lifted there. (ESLint does not
    // lint JSON without a dedicated processor; the glob is listed for clarity
    // and forward compatibility.)
    name: 'auditor/finest-large-by-nature',
    files: [
      '**/*.config.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
      '**/*.d.ts',
      '**/*.json',
      '**/*.generated.*',
      '**/generated/**',
      '**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}',
      '**/__tests__/**',
      '**/__test__/**',
      '**/__spec__/**',
    ],
    rules: {
      'max-lines': 'off',
    },
  },
];

export default finest;
