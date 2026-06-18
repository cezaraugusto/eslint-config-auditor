// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
// Formatting/stylistic rules, split out so quality-only consumers (who format
// with Biome/Prettier) are not forced into a second formatter. Opt in with
// `eslint-config-auditor/stylistic` on top of the base config.
import stylistic from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';

const stylisticConfig: Linter.Config[] = [
  {
    name: 'auditor/stylistic',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/arrow-spacing': [
        'error',
        {
          after: true,
          before: true,
        },
      ],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
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
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': 'error',
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/generator-star-spacing': [
        'error',
        {
          after: true,
          before: true,
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
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      '@stylistic/max-len': [
        'error',
        {
          code: 80,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      '@stylistic/max-statements-per-line': [
        'warn',
        {
          max: 1,
        },
      ],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': 'error',
      '@stylistic/no-confusing-arrow': 'error',
      '@stylistic/no-extra-parens': ['error', 'functions'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
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
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
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
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          allowTemplateLiterals: 'never',
          avoidEscape: true,
        },
      ],
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
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/wrap-iife': [
        'error',
        'any',
        {
          functionPrototypeMethods: true,
        },
      ],
      '@stylistic/yield-star-spacing': ['error', 'both'],
    },
  },
];

export default stylisticConfig;
