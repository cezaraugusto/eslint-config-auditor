import type { ESLint, Linter } from 'eslint';
import * as importPluginModule from 'eslint-plugin-import';

type ImportPlugin = ESLint.Plugin & {
  flatConfigs: {
    recommended: Linter.Config;
    errors: Linter.Config;
    warnings: Linter.Config;
    typescript: Linter.Config;
    react: Linter.Config;
  };
};

// eslint-plugin-import is published with `__esModule: true` but no `default`
// export, so module interop differs between ESM and CJS consumers. Normalize
// it so both builds share the exact same plugin instance.
const importPlugin = ((importPluginModule as { default?: unknown }).default ??
  importPluginModule) as ImportPlugin;

export default importPlugin;
