import { createRequire } from 'node:module';
import path from 'node:path';
import { ESLint, Linter } from 'eslint';
import { describe, expect, test } from 'vitest';
import auditor, {
  finest,
  jest as jestConfig,
  react as reactConfig,
  recommended,
  stylistic,
  ts as tsConfig,
  typescriptChecked as typescriptCheckedConfig,
  typescript as typescriptConfig,
  vitest as vitestConfig,
} from '../dist/index.js';

const FIXTURES = path.join(__dirname, 'fixtures');

// eslint-plugin-react <=7.37.5 calls the context.getFilename()/getScope() APIs
// that ESLint 10 removed, so several of its rules throw at lint time on ESLint
// 10+. The `react` config is therefore documented as experimental until
// eslint-plugin-react ships an ESLint 10 compatible release. This guard runs the
// react live-lint test on ESLint 9 (where it passes) and skips it on 10+.
// TODO: remove once eslint-plugin-react supports ESLint 10.
const ESLINT_MAJOR = Number.parseInt(ESLint.version.split('.')[0], 10);
const reactLintTest = ESLINT_MAJOR >= 10 ? test.skip : test;

const variants: Record<string, Linter.Config[]> = {
  index: auditor,
  recommended,
  finest,
  jest: jestConfig,
  vitest: vitestConfig,
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

  test('formatting is split out: recommended has no @stylistic rules, stylistic does', () => {
    const ruleIds = (cfgs: Linter.Config[]) =>
      cfgs.flatMap((c) => Object.keys(c.rules ?? {}));
    const recStylistic = ruleIds(recommended).filter((id) =>
      id.startsWith('@stylistic/'),
    );
    const stylStylistic = ruleIds(stylistic).filter((id) =>
      id.startsWith('@stylistic/'),
    );
    expect(recStylistic).toEqual([]);
    expect(stylStylistic.length).toBeGreaterThan(0);
  });

  test('package is consumable from CommonJS', () => {
    const require = createRequire(import.meta.url);
    const cjs = require('../dist/index.cjs');
    const cjsDefault = cjs.default ?? cjs;

    expect(Array.isArray(cjsDefault)).toBe(true);
    expect(Array.isArray(cjs.recommended)).toBe(true);
    expect(Array.isArray(cjs.finest)).toBe(true);
    expect(Array.isArray(cjs.jest)).toBe(true);
    expect(Array.isArray(cjs.vitest)).toBe(true);
    expect(Array.isArray(cjs.react)).toBe(true);
    expect(Array.isArray(cjs.stylistic)).toBe(true);
    expect(Array.isArray(cjs.typescript)).toBe(true);
    expect(Array.isArray(cjs.typescriptChecked)).toBe(true);
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

  test('vitest config provides test globals (no no-undef on describe/it/expect)', async () => {
    // recommended turns no-undef on; the vitest env config must supply the
    // test globals so they are not flagged.
    const result = await lint(
      [...recommended, ...vitestConfig],
      path.join(FIXTURES, 'vitest-sample.js'),
    );
    expect(result.fatalErrorCount).toBe(0);
    const undef = result.messages.filter((m) => m.ruleId === 'no-undef');
    expect(undef).toEqual([]);
  });

  reactLintTest('react lints a JSX file', async () => {
    const result = await lint(
      reactConfig,
      path.join(FIXTURES, 'component.jsx'),
      { extraFiles: ['**/*.jsx'] },
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('typescript (default, syntactic) lints a TS file', async () => {
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

  test('default typescript is NOT type-aware (no project service, no crash on stray .ts)', async () => {
    // typed-check.ts is not under the fixture tsconfig from this cwd; the
    // default config must lint it syntactically without a project-service
    // parse error, and must not run type-aware rules.
    const result = await lint(
      typescriptConfig,
      path.join(FIXTURES, 'ts', 'typed-check.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    expect(result.fatalErrorCount).toBe(0);
    const projectErr = result.messages.filter((m) =>
      /project service|was not found by/i.test(m.message),
    );
    expect(projectErr).toEqual([]);
    const typed = result.messages.filter(
      (m) => m.ruleId === '@typescript-eslint/only-throw-error',
    );
    expect(typed).toEqual([]);
  });

  test('typescript-checked runs type-aware rules against the project service', async () => {
    const result = await lint(
      typescriptCheckedConfig,
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

describe('hardened style rules', () => {
  const linter = new Linter();
  // @stylistic rules now live in the opt-in `stylistic` config, so exercise
  // them with recommended + stylistic composed (how consumers opt in).
  const ids = (
    code: string,
    rule: string,
    configs: Linter.Config[] = [...recommended, ...stylistic],
    filename = 'file.js',
  ) =>
    linter
      .verify(code, configs, { filename })
      .filter((message) => message.ruleId === rule);

  test('arrow-parens requires parentheses around a single param', () => {
    expect(ids('const f = (x) => x\n', '@stylistic/arrow-parens')).toEqual([]);
    expect(
      ids('const f = x => x\n', '@stylistic/arrow-parens').length,
    ).toBeGreaterThan(0);
  });

  test('jsx-quotes prefers double quotes', () => {
    const configs = [
      ...recommended,
      ...stylistic,
      { files: ['**/*.jsx'], rules: {} },
    ];
    expect(
      ids(
        'const a = <div id="x" />\n',
        '@stylistic/jsx-quotes',
        configs,
        'c.jsx',
      ),
    ).toEqual([]);
    expect(
      ids(
        "const a = <div id='x' />\n",
        '@stylistic/jsx-quotes',
        configs,
        'c.jsx',
      ).length,
    ).toBeGreaterThan(0);
  });

  test('if statements must be surrounded by blank lines', () => {
    const rule = '@stylistic/padding-line-between-statements';
    // Missing blank lines before and after the if -> two reports.
    expect(
      ids('const a = 1\nif (a) {\n  a\n}\na\n', rule).length,
    ).toBeGreaterThanOrEqual(2);
    // Properly padded -> no reports.
    expect(ids('const a = 1\n\nif (a) {\n  a\n}\n\na\n', rule)).toEqual([]);
  });

  test('an early return stays tight against its guard if', () => {
    const rule = '@stylistic/padding-line-between-statements';
    const code =
      'function g() {\n  if (cond) {\n    cond\n  }\n  return 1\n}\n';
    expect(ids(code, rule)).toEqual([]);
  });

  test('max-lines caps source files at 350 LOC but exempts large-by-nature files', async () => {
    const longFile = 'globalThis.x = 1\n'.repeat(351);
    const run = async (filename: string) => {
      const eslint = new ESLint({
        cwd: FIXTURES,
        overrideConfigFile: true,
        overrideConfig: finest as Linter.Config[],
      });
      const [result] = await eslint.lintText(longFile, { filePath: filename });
      return result.messages.filter((m) => m.ruleId === 'max-lines');
    };

    // Hand-written source is capped...
    expect((await run(path.join(FIXTURES, 'big.js'))).length).toBeGreaterThan(
      0,
    );
    // ...but config, declaration, generated, and test/spec files are exempt.
    expect(await run(path.join(FIXTURES, 'big.config.js'))).toEqual([]);
    expect(await run(path.join(FIXTURES, 'big.d.ts'))).toEqual([]);
    expect(await run(path.join(FIXTURES, 'big.test.ts'))).toEqual([]);
    expect(await run(path.join(FIXTURES, 'big.spec.js'))).toEqual([]);
    expect(await run(path.join(FIXTURES, '__tests__', 'big.js'))).toEqual([]);
  });
});

describe('consumer ergonomics', () => {
  test('ts preset equals recommended + finest + typescript', () => {
    expect(tsConfig).toEqual([...recommended, ...finest, ...typescriptConfig]);
  });

  test('ts preset is exported from the CommonJS build', () => {
    const require = createRequire(import.meta.url);
    const cjs = require('../dist/index.cjs');
    expect(Array.isArray(cjs.ts)).toBe(true);
  });

  test('ts preset lints a .ts file as a single import', async () => {
    const result = await lint(
      tsConfig,
      path.join(FIXTURES, 'ts', 'example.ts'),
      { cwd: path.join(FIXTURES, 'ts') },
    );
    expect(result.fatalErrorCount).toBe(0);
  });

  test('recommended lints .jsx files without extra file config', async () => {
    // Previously .jsx matched no config ("No matching configuration found");
    // the auditor/recommended-jsx entry now opts it in. Compose stylistic so a
    // real rule fires against the JSX, proving the file is actually linted.
    const result = await lint(
      [...recommended, ...stylistic],
      path.join(FIXTURES, 'component.jsx'),
    );
    expect(result.fatalErrorCount).toBe(0);
    const noMatch = result.messages.filter((m) =>
      /no matching configuration/i.test(m.message),
    );
    expect(noMatch).toEqual([]);
    // A real rule actually ran against the JSX file (not silently skipped).
    expect(result.messages.length).toBeGreaterThan(0);
  });

  test('typescript-checked lints a loose *.config.ts via allowDefaultProject', async () => {
    const cwd = path.join(FIXTURES, 'loose-ts');
    // allowDefaultProject globs are matched relative to tsconfigRootDir (which
    // defaults to the directory ESLint runs from). Point it at the fixture
    // root to mirror a consumer running `eslint` from their repo root, where
    // `*.config.ts` matches a top-level config file.
    const result = await lint(
      [
        ...(typescriptCheckedConfig as Linter.Config[]),
        {
          files: ['**/*.ts'],
          languageOptions: { parserOptions: { tsconfigRootDir: cwd } },
        },
      ],
      path.join(cwd, 'tool.config.ts'),
      { cwd },
    );
    // The file is outside tsconfig `include`; without allowDefaultProject the
    // project service throws a fatal "not found by the project service".
    expect(result.fatalErrorCount).toBe(0);
    const projectErr = result.messages.filter((m) =>
      /project service|was not found by/i.test(m.message),
    );
    expect(projectErr).toEqual([]);
  });

  test('import/order runs on ESLint 10 without crashing', () => {
    // eslint-plugin-import's import/order calls sourceCode.getTokenOrCommentAfter
    // (removed in ESLint 10) while checking `newlines-between`, throwing on any
    // multi-group import block. eslint-plugin-import-x fixes it. This file has
    // builtin + external + relative imports with no blank lines between groups,
    // which is exactly the path that used to crash.
    const code = [
      "import path from 'node:path'",
      "import semver from 'semver'",
      "import {foo} from './foo'",
      '',
      'export {path, semver, foo}',
      '',
    ].join('\n');
    // verify() throws if a rule crashes; reaching the assertion means it ran.
    const messages = new Linter().verify(code, recommended, {
      filename: 'imports.js',
    });
    const order = messages.filter((m) => m.ruleId === 'import/order');
    expect(order.length).toBeGreaterThan(0);
  });

  test('node/no-sync does not crash without type information', () => {
    // eslint-plugin-n v18 made no-sync type-aware (it calls getParserServices),
    // so a *Sync call throws "requires type information" without a project
    // service. It must be off in the syntactic default. verify() would throw if
    // it ran; reaching the assertion proves it is disabled.
    const code = "import fs from 'node:fs'\n\nfs.readFileSync('x')\n";
    const messages = new Linter().verify(code, recommended, {
      filename: 'sync.js',
    });
    const noSync = messages.filter((m) => m.ruleId === 'node/no-sync');
    expect(noSync).toEqual([]);
  });
});
