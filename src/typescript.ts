// Rules are adapted from https://github.com/kaisermann/kiwi
// MIT License. Christian Kaisermann <https://github.com/kaisermann>
import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import importPlugin from './import-plugin';

const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

// Default TypeScript config: syntactic only. It does NOT enable the
// typescript-eslint project service, so it never throws "not found by the
// project service" on `.ts` files outside a tsconfig (root tests, scripts,
// etc.) and needs no per-file tsconfig coverage. For the ~10 rules that require
// type information, use `eslint-config-auditor/typescript-checked` instead.
const typescript: Linter.Config[] = [
  // Equivalent of the legacy "plugin:@typescript-eslint/eslint-recommended"
  // and "plugin:@typescript-eslint/recommended" presets, scoped to TS files
  ...(tseslint.configs.recommended.map((config) => ({
    ...config,
    files: TS_FILES,
  })) as Linter.Config[]),
  // Equivalent of the legacy "plugin:import/typescript" preset.
  // Settings/rules are reused but the plugin instance is normalized so the
  // "import" namespace is shared with the other auditor configs.
  {
    name: 'auditor/typescript-import',
    files: TS_FILES,
    plugins: {
      import: importPlugin,
    },
    settings: importPlugin.flatConfigs.typescript.settings,
    rules: importPlugin.flatConfigs.typescript.rules,
  },
  {
    name: 'auditor/typescript',
    files: TS_FILES,
    languageOptions: {
      parser: tseslint.parser as Linter.Parser,
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array-simple',
          readonly: 'array-simple',
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          minimumDescriptionLength: 3,
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
        },
      ],
      // Replaces "@typescript-eslint/ban-types" (banned Boolean, Number,
      // String and Symbol wrapper objects), removed in typescript-eslint v8
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          disallowTypeAnnotations: true,
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            parameterProperties: 'explicit',
          },
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      // Replaces "@typescript-eslint/no-empty-interface", removed in
      // typescript-eslint v8
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
        },
      ],
      '@typescript-eslint/no-magic-numbers': [
        'off',
        {
          detectObjects: false,
          enforceConst: true,
          ignore: [0, 1, 2, 3],
          ignoreArrayIndexes: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
        },
      ],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          allow: [
            'cb',
            'callback',
            'data',
            'done',
            'error',
            'next',
            'reject',
            'req',
            'res',
            'resolve',
            'response',
          ],
        },
      ],
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '_+',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          classes: false,
          enums: false,
          functions: false,
          typedefs: false,
          variables: true,
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'warn',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          lib: 'always',
          path: 'always',
          types: 'prefer-import',
        },
      ],
      camelcase: 'off',
      'default-param-last': 'off',
      'no-empty-function': 'off',
      'no-magic-numbers': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
    },
  },
  {
    name: 'auditor/typescript-declarations',
    files: ['**/*.d.ts'],
    rules: {
      'import/export': 'off',
      'import/no-duplicates': 'off',
      'import/order': 'off',
    },
  },
  {
    name: 'auditor/typescript-tests',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];

export default typescript;
