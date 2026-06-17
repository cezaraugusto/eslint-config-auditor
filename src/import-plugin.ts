import type { ESLint, Linter } from 'eslint';
import * as importPluginModule from 'eslint-plugin-import-x';

type ImportPlugin = ESLint.Plugin & {
  flatConfigs: {
    recommended: Linter.Config;
    errors: Linter.Config;
    warnings: Linter.Config;
    typescript: Linter.Config;
    react: Linter.Config;
  };
};

// eslint-plugin-import-x is the actively maintained fork of eslint-plugin-import
// and supports ESLint 10 (the original calls APIs ESLint 10 removed, e.g.
// `sourceCode.getTokenOrCommentAfter`, and crashes in `import/order`). It is a
// drop-in replacement: the same `import/*` rule names and `flatConfigs` are
// exposed, so it is still registered under the `import` namespace and existing
// inline directives keep working. Module interop is normalized so the ESM and
// CJS builds share one plugin instance.
const importPlugin = ((importPluginModule as { default?: unknown }).default ??
  importPluginModule) as unknown as ImportPlugin;

export default importPlugin;
