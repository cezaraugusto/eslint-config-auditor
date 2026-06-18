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
import stylistic from '@stylistic/eslint-plugin';
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
      '@stylistic': stylistic,
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
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
        },
      ],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/arrow-spacing': [
        'error',
        {
          after: true,
          before: true,
        },
      ],
      'block-scoped-var': 'error',
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      camelcase: [
        'error',
        {
          allow: ['^UNSAFE_'],
          ignoreGlobals: true,
          properties: 'never',
        },
      ],
      'capitalized-comments': [
        'warn',
        'always',
        {
          ignoreConsecutiveComments: true,
          ignoreInlineComments: true,
        },
      ],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/comma-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': [
        'error',
        'never',
        {
          enforceForClassMembers: true,
        },
      ],
      'consistent-return': [
        'error',
        {
          treatUndefinedAsUnspecified: true,
        },
      ],
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
      '@stylistic/dot-location': ['error', 'property'],
      'dot-notation': [
        'error',
        {
          allowKeywords: true,
        },
      ],
      '@stylistic/eol-last': 'error',
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],
      'for-direction': 'error',
      '@stylistic/function-call-spacing': ['error', 'never'],
      'func-names': 'warn',
      'func-style': [
        'warn',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/generator-star-spacing': [
        'error',
        {
          after: true,
          before: true,
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
      '@stylistic/indent': [
        'error',
        2,
        {
          ArrayExpression: 1,
          CallExpression: {
            arguments: 1,
          },
          flatTernaryExpressions: false,
          FunctionDeclaration: {
            body: 1,
            parameters: 1,
          },
          FunctionExpression: {
            body: 1,
            parameters: 1,
          },
          ignoreComments: false,
          ignoredNodes: [
            'TemplateLiteral *',
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild',
          ],
          ImportDeclaration: 1,
          MemberExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: true,
          outerIIFEBody: 1,
          SwitchCase: 1,
          VariableDeclarator: 1,
        },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/key-spacing': [
        'error',
        {
          afterColon: true,
          beforeColon: false,
        },
      ],
      '@stylistic/keyword-spacing': [
        'error',
        {
          after: true,
          before: true,
        },
      ],
      '@stylistic/line-comment-position': [
        'warn',
        {
          applyDefaultIgnorePatterns: true,
          position: 'above',
        },
      ],
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'max-classes-per-file': ['off', 1],
      '@stylistic/max-len': [
        'error',
        {
          code: 80,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'max-params': [
        'warn',
        {
          max: 3,
        },
      ],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      'new-cap': [
        'error',
        {
          capIsNew: false,
          newIsCap: true,
        },
      ],
      '@stylistic/new-parens': 'error',
      'no-alert': 'warn',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'except-parens'],
      '@stylistic/no-confusing-arrow': 'error',
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
      '@stylistic/no-extra-parens': ['error', 'functions'],
      '@stylistic/no-extra-semi': 'error',
      'no-fallthrough': 'error',
      '@stylistic/no-floating-decimal': 'error',
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
      '@stylistic/no-mixed-operators': [
        'error',
        {
          allowSamePrecedence: true,
          groups: [
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
        },
      ],
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      'no-multi-assign': 'error',
      '@stylistic/no-multi-spaces': 'error',
      'no-multi-str': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],
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
      '@stylistic/no-tabs': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      '@stylistic/no-trailing-spaces': 'error',
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
      '@stylistic/no-whitespace-before-property': 'error',
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
      '@stylistic/object-curly-newline': [
        'error',
        {
          consistent: true,
          multiline: true,
        },
      ],
      '@stylistic/object-curly-spacing': ['error', 'never'],
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
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
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            ':': 'before',
            '?': 'before',
            '|>': 'before',
          },
        },
      ],
      '@stylistic/padded-blocks': [
        'error',
        {
          blocks: 'never',
          classes: 'never',
          switches: 'never',
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        // Always surround `if` statements with a blank line. The first
        // statement in a block is naturally exempt (there is no preceding
        // statement to pad against), and the `if`->`return` exception below
        // keeps an early return tight against its guard.
        {
          blankLine: 'always',
          next: 'if',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: 'if',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['multiline-const', 'multiline-let', 'multiline-var'],
        },
        {
          blankLine: 'always',
          next: 'return',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: 'return',
          prev: 'block-like',
        },
        {
          blankLine: 'always',
          next: ['case', 'default'],
          prev: ['break', 'return'],
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['function', 'class', 'multiline-block-like'],
        },
        {
          blankLine: 'any',
          next: ['cjs-import'],
          prev: ['cjs-import'],
        },
        // Keep an early return tight against its guard: an `if` followed
        // directly by `return` needs no blank line. Listed last so it wins
        // over the block-like/multiline-block-like -> return rules above.
        {
          blankLine: 'any',
          next: 'return',
          prev: 'if',
        },
      ],
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
      'prefer-destructuring': [
        'warn',
        {
          AssignmentExpression: {
            array: false,
            object: false,
          },
          VariableDeclarator: {
            array: true,
            object: true,
          },
        },
        {
          enforceForRenamedProperties: false,
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
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          allowTemplateLiterals: 'never',
          avoidEscape: true,
        },
      ],
      radix: 'error',
      'require-atomic-updates': 'off',
      'require-await': 'error',
      'require-yield': 'error',
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/semi-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': [
        'error',
        {
          nonwords: false,
          words: true,
        },
      ],
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          block: {
            balanced: true,
            exceptions: ['-', '+'],
            markers: ['-', '+', '?', '!'],
          },
          line: {
            exceptions: ['-', '+'],
            markers: ['-', '+', '?', '!', '/'],
          },
        },
      ],
      'symbol-description': 'error',
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
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
      '@stylistic/wrap-iife': [
        'error',
        'any',
        {
          functionPrototypeMethods: true,
        },
      ],
      '@stylistic/yield-star-spacing': ['error', 'both'],
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
