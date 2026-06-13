// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import finest from './finest';
import jest from './jest';
import react from './react';
import recommended from './recommended';
import typescript from './typescript';

export { finest, jest, react, recommended, typescript };

// Equivalent of the legacy root config: extends "recommended" + "finest"
const auditor: Linter.Config[] = [...recommended, ...finest];

export default auditor;
