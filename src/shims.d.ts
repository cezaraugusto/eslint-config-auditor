// Ambient module declarations for ESLint plugins that do not ship
// their own TypeScript type definitions. (eslint-plugin-import-x ships its
// own types, so it does not need a shim here.)
declare module 'eslint-plugin-jsx-a11y' {
  import type { ESLint, Linter } from 'eslint';

  const plugin: ESLint.Plugin & {
    flatConfigs: {
      recommended: Linter.Config;
      strict: Linter.Config;
    };
  };
  export default plugin;
}

declare module 'eslint-plugin-react' {
  import type { ESLint, Linter } from 'eslint';

  const plugin: ESLint.Plugin & {
    configs: {
      flat: {
        recommended: Linter.Config;
        all: Linter.Config;
        'jsx-runtime': Linter.Config;
      };
    };
  };
  export default plugin;
}

declare module 'eslint-plugin-react-hooks' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;
  export default plugin;
}

declare module 'eslint-plugin-promise' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;
  export default plugin;
}
