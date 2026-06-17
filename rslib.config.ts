import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
      recommended: './src/recommended.ts',
      finest: './src/finest.ts',
      jest: './src/jest.ts',
      react: './src/react.ts',
      typescript: './src/typescript.ts',
      'typescript-checked': './src/typescript-checked.ts',
      ts: './src/ts.ts',
    },
  },
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: true,
    },
    {
      format: 'cjs',
      syntax: 'es2021',
    },
  ],
  output: {
    target: 'node',
  },
});
