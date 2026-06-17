// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import finest from './finest';
import jest from './jest';
import react from './react';
import recommended from './recommended';
import ts from './ts';
import typescript from './typescript';
import typescriptChecked from './typescript-checked';

export { finest, jest, react, recommended, ts, typescript, typescriptChecked };

// Equivalent of the legacy root config: extends "recommended" + "finest"
const auditor: Linter.Config[] = [...recommended, ...finest];

export default auditor;
