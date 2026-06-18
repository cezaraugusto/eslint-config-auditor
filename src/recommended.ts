//  /████████  /██████  /██       /██████ /██   /██ /████████
// | ██_____/ /██__  ██| ██      |_  ██_/| ███ | ██|__  ██__/
// | ██      | ██  \__/| ██        | ██  | ████| ██   | ██
// | █████   |  ██████ | ██        | ██  | ██ ██ ██   | ██ /██████
// | ██__/    \____  ██| ██        | ██  | ██  ████   | ██|______/
// | ██       /██  \ ██| ██        | ██  | ██\  ███   | ██
// | ████████|  ██████/| ████████ /██████| ██ \  ██   | ██
// |________/ \______/ |________/|______/|__/  \__/   |__/
//   /██████   /██████  /██   /██ /████████ /██████  /██████
//  /██__  ██ /██__  ██| ███ | ██| ██_____/|_  ██_/ /██__  ██
// | ██  \__/| ██  \ ██| ████| ██| ██        | ██  | ██  \__/
// | ██      | ██  | ██| ██ ██ ██| █████     | ██  | ██ /████ /██████
// | ██      | ██  | ██| ██  ████| ██__/     | ██  | ██|_  ██|______/
// | ██    ██| ██  | ██| ██\  ███| ██        | ██  | ██  \ ██
// |  ██████/|  ██████/| ██ \  ██| ██       /██████|  ██████/
//  \______/  \______/ |__/  \__/|__/      |______/ \______/
//   /██████  /██   /██ /███████  /██████ /████████ /██████  /███████
//  /██__  ██| ██  | ██| ██__  ██|_  ██_/|__  ██__//██__  ██| ██__  ██
// | ██  \ ██| ██  | ██| ██  \ ██  | ██     | ██  | ██  \ ██| ██  \ ██
// | ████████| ██  | ██| ██  | ██  | ██     | ██  | ██  | ██| ███████/
// | ██__  ██| ██  | ██| ██  | ██  | ██     | ██  | ██  | ██| ██__  ██
// | ██  | ██| ██  | ██| ██  | ██  | ██     | ██  | ██  | ██| ██  \ ██
// | ██  | ██|  ██████/| ███████/ /██████   | ██  |  ██████/| ██  | ██
// |__/  |__/ \______/ |_______/ |______/   |__/   \______/ |__/  |__/
//
// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import globals from 'globals';
import importPlugin from './import-plugin';

const recommended: Linter.Config[] = [
  {
    name: 'auditor/recommended',
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      node: nodePlugin,
      promise: promisePlugin,
    },
    rules: {
      'accessor-pairs': [
        'error',
        {
          enforceForClassMembers: true,
          setWithoutGet: true,
        },
      ],
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
        },
      ],
      'block-scoped-var': 'error',
      camelcase: [
        'error',
        {
          allow: ['^UNSAFE_'],
          ignoreGlobals: true,
          properties: 'never',
        },
      ],
      'consistent-return': 'error',
      'constructor-super': 'error',
      curly: ['error', 'multi-line'],
      'default-case': [
        'error',
        {
          commentPattern: '^no default$',
        },
      ],
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': [
        'error',
        {
          allowKeywords: true,
        },
      ],
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],
      'for-direction': 'error',
      'func-names': 'warn',
      'func-style': [
        'warn',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'getter-return': [
        'error',
        {
          allowImplicit: true,
        },
      ],
      'grouped-accessor-pairs': 'error',
      'import/export': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-absolute-path': [
        'error',
        {
          amd: false,
          commonjs: true,
          esmodule: true,
        },
      ],
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'off',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      // No-op on ESLint 10: the rule needs the FileEnumerator API that ESLint
      // 10 removed (eslint-plugin-import-x emits a warning and does nothing).
      // Off until the fork ships an alternative implementation.
      'import/no-unused-modules': 'off',
      'import/no-useless-path-segments': [
        'error',
        {
          commonjs: true,
        },
      ],
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'internal',
              pattern: '{$,@}/**',
            },
            {
              group: 'object',
              pattern: '*.json',
              patternOptions: {
                matchBase: true,
              },
            },
          ],
          pathGroupsExcludedImportTypes: [],
        },
      ],
      'max-classes-per-file': ['off', 1],
      'max-params': [
        'warn',
        {
          max: 3,
        },
      ],
      'new-cap': [
        'warn',
        {
          capIsNew: false,
          newIsCap: true,
        },
      ],
      'no-alert': 'warn',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'except-parens'],
      'no-console': [
        'off',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],
      'no-const-assign': 'error',
      'no-constant-condition': [
        'error',
        {
          checkLoops: false,
        },
      ],
      'no-constructor-return': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-empty-character-class': 'error',
      'no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implicit-coercion': [
        2,
        {
          allow: ['!!', '~'],
        },
      ],
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-inline-comments': 'off',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-invalid-this': 'error',
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'off',
      'no-loop-func': 'error',
      'no-loss-of-precision': 'error',
      'no-magic-numbers': [
        'off',
        {
          detectObjects: false,
          enforceConst: true,
          ignore: [0, 1, 2, 3],
          ignoreArrayIndexes: true,
        },
      ],
      'no-misleading-character-class': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-object-constructor': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-restricted-globals': ['error', 'isFinite', 'isNaN'],
      'no-restricted-syntax': [
        'error',
        {
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
          selector: 'LabeledStatement',
        },
        {
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
          selector: 'WithStatement',
        },
        {
          message:
            "Literal types and enums, in many cases, solve the same problem while enum has some trade-offs that usually literal types don't. Consider using a const enum or a literal type instead.",
          selector: 'TSEnumDeclaration:not([const=true])',
        },
      ],
      'no-return-assign': ['error', 'except-parens'],
      'no-script-url': 'error',
      'no-self-assign': [
        'error',
        {
          props: true,
        },
      ],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-setter-return': 'error',
      'no-shadow': [
        'error',
        {
          allow: [
            'cb',
            'callback',
            'data',
            'done',
            'error',
            'item',
            'items',
            'next',
            'reject',
            'res',
            'resolve',
            'response',
          ],
        },
      ],
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false,
        },
      ],
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      'no-unused-labels': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_+',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      'no-use-before-define': [
        'off',
        {
          classes: false,
          functions: false,
          variables: true,
        },
      ],
      'no-useless-backreference': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'off',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',
      'no-useless-rename': ['error'],
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'node/callback-return': 'off',
      'node/exports-style': [
        'error',
        'module.exports',
        {
          allowBatchAssign: false,
        },
      ],
      'node/global-require': 'error',
      'node/handle-callback-err': ['error', '^(err|error|reason)$'],
      'node/no-deprecated-api': 'error',
      'node/no-exports-assign': 'error',
      'node/no-extraneous-import': 'error',
      'node/no-extraneous-require': 'error',
      'node/no-missing-require': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      'node/no-process-env': 'off',
      'node/no-process-exit': 'error',
      'node/no-restricted-import': 2,
      'node/no-restricted-require': 2,
      // eslint-plugin-n v18 made `no-sync` type-aware (it calls
      // getParserServices), so it throws without type information. It is off in
      // the syntactic default and re-enabled in `typescript-checked`.
      'node/no-sync': 'off',
      'node/no-unsupported-features/es-builtins': 'error',
      'node/prefer-global/buffer': 'error',
      'node/prefer-global/console': 'error',
      'node/prefer-global/process': 'error',
      'node/prefer-global/text-decoder': 'error',
      'node/prefer-global/text-encoder': 'error',
      'node/prefer-global/url': 'error',
      'node/prefer-global/url-search-params': 'error',
      'node/prefer-promises/dns': 'warn',
      'node/prefer-promises/fs': 'warn',
      'node/process-exit-as-throw': 'error',
      'node/hashbang': 'error',
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: true,
          ignoreConstructors: false,
        },
      ],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'prefer-arrow-callback': [
        'off',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'warn',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-return-in-finally': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/valid-params': 'warn',
      radix: 'error',
      'require-atomic-updates': 'off',
      'require-await': 'error',
      'require-yield': 'error',
      'symbol-description': 'error',
      'unicode-bom': ['error', 'never'],
      'use-isnan': [
        'error',
        {
          enforceForIndexOf: true,
          enforceForSwitchCase: true,
        },
      ],
      'valid-typeof': [
        'error',
        {
          requireStringLiterals: true,
        },
      ],
      'vars-on-top': 'error',
      yoda: ['error', 'never'],
    },
  },
  {
    // ESLint only lints `.js`/`.mjs`/`.cjs` by default, so the rules above
    // (a fileless, global config) never reach `.jsx` files. This entry opts
    // `.jsx` into linting so plain-JSX projects work with just the base
    // config. TypeScript's `.tsx` is handled by the `typescript` config.
    name: 'auditor/recommended-jsx',
    files: ['**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export default recommended;
