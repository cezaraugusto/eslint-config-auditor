import { createRequire } from 'node:module';
import path from 'node:path';
import { ESLint, type Linter } from 'eslint';
import { describe, expect, test } from 'vitest';
import auditor, {
  finest,
  jest as jestConfig,
  react as reactConfig,
  recommended,
  typescript as typescriptConfig,
} from '../dist/index.js';

const FIXTURES = path.join(__dirname, 'fixtures');

const variants: Record<string, Linter.Config[]> = {
  index: auditor,
  recommended,
  finest,
  jest: jestConfig,
  react: reactConfig,
  typescript: typescriptConfig,
};

async function lint(
  configs: Linter.Config[],
  file: string,
  options: { cwd?: string; extraFiles?: string[] } = {},
) {
  const overrideConfig = options.extraFiles
    ? [...configs, { files: options.extraFiles, rules: {} }]
    : configs;
  const eslint = new ESLint({
    cwd: options.cwd ?? FIXTURES,
    overrideConfigFile: true,
    overrideConfig,
  });
  const results = await eslint.lintFiles([file]);

  expect(results).toHaveLength(1);

  // No fatal errors (parse errors, unknown rules, invalid options, etc.)
  const fatal = results[0].messages.filter((message) => message.fatal);
  expect(fatal).toEqual([]);

  // No "definition not found" style messages
  const unknown = results[0].messages.filter((message) =>
    /definition for rule|could not find/i.test(message.message),
  );
  expect(unknown).toEqual([]);

  return results[0];
}

describe('config structure', () => {
  for (const [name, configs] of Object.entries(variants)) {
    test(`${name} exports a flat config array`, () => {
      expect(Array.isArray(configs)).toBe(true);
      expect(configs.length).toBeGreaterThan(0);

      for (const config of configs) {
        expect(config).toBeTypeOf('object');
        // Flat config objects must not use legacy eslintrc keys
        expect(config).not.toHaveProperty('env');
        expect(config).not.toHaveProperty('extends');
        expect(config).not.toHaveProperty('parserOptions');
        expect(config).not.toHaveProperty('overrides');
        if (config.plugins) {
          // Flat config plugins are objects keyed by namespace, not arrays
          expect(Array.isArray(config.plugins)).toBe(false);
          for (const plugin of Object.values(config.plugins)) {
            expect(plugin).toBeTypeOf('object');
            expect(plugin).toHaveProperty('rules');
          }
        }
      }
    });
  }

  test('default export combines recommended + finest', () => {
    expect(auditor).toEqual([...recommended, ...finest]);
  });

  test('recommended declares globals via languageOptions', () => {
    const globalsUsed = recommended[0].languageOptions?.globals ?? {};
    expect(globalsUsed).toMatchObject({
      document: 'readonly',
      navigator: 'readonly',
      window: 'readonly',
    });
    // From globals.node
    expect(globalsUsed).toHaveProperty('process');
    // From globals.es2021
    expect(globalsUsed).toHaveProperty('Promise');
  });

  test('package is consumable from CommonJS', () => {
    const require = createRequire(import.meta.url);
    const cjs = require('../dist/index.cjs');
    const cjsDefault = cjs.default ?? cjs;

    expect(Array.isArray(cjsDefault)).toBe(true);
    expect(Array.isArray(cjs.recommended)).toBe(true);
    expect(Array.isArray(cjs.finest)).toBe(true);
    expect(Array.isArray(cjs.jest)).toBe(true);
    expect(Array.isArray(cjs.react)).toBe(true);
    expect(Array.isArray(cjs.typescript)).toBe(true);
  });
});

describe('programmatic ESLint 9 validation', () => {
  test('index (recommended + finest) lints a plain JS file', async () => {
    const result = await lint(auditor, path.join(FIXTURES, 'plain.js'));
    expect(result.fatalErrorCount).toBe(0);
  });

  test('recommended lints a plain JS file', async () => {
    const result = await lint(recommended, path.join(FIXTURES, 'plain.js'));
    expect(result.fatalErrorCount).toBe(0);
  });

  test('finest lints a plain JS file', async () => {
    const result = await lint(finest, path.join(FIXTURES, 'plain.js'));
    expect(result.fatalErrorCount).toBe(0);
  });

  test('jest lints a test file', async () => {
    const result = await lint(
      jestConfig,
      path.join(FIXTURES, 'example.test.js'),
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('react lints a JSX file', async () => {
    const result = await lint(
      reactConfig,
      path.join(FIXTURES, 'component.jsx'),
      { extraFiles: ['**/*.jsx'] },
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('typescript lints a TS file (type-aware)', async () => {
    const result = await lint(
      typescriptConfig,
      path.join(FIXTURES, 'ts', 'example.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('typescript lints a .d.ts file (declaration overrides)', async () => {
    const result = await lint(
      typescriptConfig,
      path.join(FIXTURES, 'ts', 'types.d.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('typescript lints a .test.ts file (test overrides)', async () => {
    const result = await lint(
      typescriptConfig,
      path.join(FIXTURES, 'ts', 'example.test.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    expect(result.fatalErrorCount).toBe(0);
    // The test override disables no-non-null-assertion
    const nonNull = result.messages.filter(
      (message) =>
        message.ruleId === '@typescript-eslint/no-non-null-assertion',
    );
    expect(nonNull).toEqual([]);
  });

  test('type-aware rules execute against the project service', async () => {
    const result = await lint(
      typescriptConfig,
      path.join(FIXTURES, 'ts', 'typed-check.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    // "@typescript-eslint/only-throw-error" requires type information;
    // it firing proves projectService resolved the fixture tsconfig
    const typed = result.messages.filter(
      (message) => message.ruleId === '@typescript-eslint/only-throw-error',
    );
    expect(typed.length).toBeGreaterThan(0);
  });

  test('combined index + typescript works for consumers', async () => {
    const result = await lint(
      [...auditor, ...typescriptConfig],
      path.join(FIXTURES, 'ts', 'example.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('every configured rule resolves to a known rule definition', async () => {
    const checks: Array<[Linter.Config[], string, string]> = [
      [auditor, 'plain.js', FIXTURES],
      [jestConfig, 'example.test.js', FIXTURES],
      [reactConfig, 'component.jsx', FIXTURES],
      [typescriptConfig, path.join('ts', 'example.ts'), FIXTURES],
    ];

    for (const [configs, file, cwd] of checks) {
      const eslint = new ESLint({
        cwd,
        overrideConfigFile: true,
        overrideConfig: [...configs, { files: ['**/*.jsx'], rules: {} }],
      });
      const config = await eslint.calculateConfigForFile(path.join(cwd, file));
      expect(config).toBeTruthy();
      expect(Object.keys(config.rules ?? {}).length).toBeGreaterThan(0);
    }
  });
});
