// Rules are adapted from https://github.com/kaisermann/kiwi
// MIT License. Christian Kaisermann <https://github.com/kaisermann>
import type { Linter } from 'eslint';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const react: Linter.Config[] = [
  // Equivalent of the legacy "plugin:react/recommended" preset
  reactPlugin.configs.flat.recommended,
  // Equivalent of the legacy "plugin:jsx-a11y/recommended" preset
  jsxA11yPlugin.flatConfigs.recommended,
  {
    name: 'auditor/react',
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      linkComponents: [
        {
          linkAttribute: 'to',
          name: 'Link',
        },
      ],
      react: {
        version: 'detect',
      },
    },
    rules: {
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to', 'page'],
        },
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/control-has-associated-label': [
        'off',
        {
          ignoreElements: [
            'audio',
            'canvas',
            'embed',
            'input',
            'textarea',
            'tr',
            'video',
          ],
          ignoreRoles: [
            'grid',
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'row',
            'tablist',
            'toolbar',
            'tree',
            'treegrid',
          ],
          includeRoles: ['alert', 'dialog'],
        },
      ],
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': [
        'error',
        {
          tabbable: [
            'button',
            'checkbox',
            'link',
            'searchbox',
            'spinbutton',
            'switch',
            'textbox',
          ],
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          controlComponents: ['Input'],
          labelAttributes: [],
          labelComponents: [],
        },
      ],
      'jsx-a11y/lang': 'error',
      'jsx-a11y/media-has-caption': 'error',
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-distracting-elements': [
        'error',
        {
          elements: ['marquee', 'blink'],
        },
      ],
      'jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        {
          tr: ['none', 'presentation'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
          alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
          body: ['onError', 'onLoad'],
          dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
          handlers: [
            'onClick',
            'onError',
            'onLoad',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
          iframe: ['onError', 'onLoad'],
          img: ['onError', 'onLoad'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
          ol: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          table: ['grid'],
          td: ['gridcell'],
          ul: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
        },
      ],
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
          allowExpressionValues: true,
          roles: ['tabpanel'],
          tags: [],
        },
      ],
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': [
        'error',
        {
          allowExpressionValues: true,
          handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
        },
      ],
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      // Equivalent of the legacy "plugin:react-hooks/recommended" preset,
      // with "exhaustive-deps" bumped to "error" as before
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/function-component-definition': 'off',
      'react/jsx-boolean-value': 'error',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'ignore',
          props: 'never',
        },
      ],
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.tsx', '.jsx'],
        },
      ],
      'react/jsx-fragments': ['off', 'element'],
      'react/jsx-handler-names': [
        'error',
        {
          eventHandlerPrefix: 'handle',
          eventHandlerPropPrefix: 'on',
        },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: true,
          ignoreRefs: true,
        },
      ],
      'react/jsx-no-target-blank': [
        'error',
        {
          enforceDynamicLinks: 'always',
        },
      ],
      'react/jsx-no-useless-fragment': 'off',
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/no-access-state-in-setstate': 'error',
      'react/no-multi-comp': 'off',
      'react/no-redundant-should-component-update': 'error',
      'react/no-this-in-sfc': 'error',
      'react/prefer-es6-class': ['error', 'always'],
      'react/prefer-stateless-function': 'error',
      'react/prop-types': [
        'error',
        {
          skipUndeclared: true,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'react/style-prop-object': 'off',
      'react/void-dom-elements-no-children': 'error',
    },
  },
];

export default react;
