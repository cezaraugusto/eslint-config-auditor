// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import finest from './finest';
import jest from './jest';
import react from './react';
import recommended from './recommended';
import stylistic from './stylistic';
import ts from './ts';
import typescript from './typescript';
import typescriptChecked from './typescript-checked';
import vitest from './vitest';

export {
  finest,
  jest,
  react,
  recommended,
  stylistic,
  ts,
  typescript,
  typescriptChecked,
  vitest,
};

// Equivalent of the legacy root config: extends "recommended" + "finest".
// Formatting/stylistic rules are intentionally NOT included here — opt into
// `eslint-config-auditor/stylistic` if you want ESLint to own formatting too.
const auditor: Linter.Config[] = [...recommended, ...finest];

export default auditor;
