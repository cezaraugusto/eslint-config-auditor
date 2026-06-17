// MIT license. Cezar Augusto <boss@cezaraugusto.net>.
import type { Linter } from 'eslint';
import finest from './finest';
import recommended from './recommended';
import typescript from './typescript';

// One-import preset for TypeScript projects: the default auditor config
// (recommended + finest) plus the TypeScript config that adds the parser and
// `**/*.ts`/`**/*.tsx` file matching. Equivalent to spreading
// `[...auditor, ...typescript]` yourself.
const ts: Linter.Config[] = [...recommended, ...finest, ...typescript];

export default ts;
