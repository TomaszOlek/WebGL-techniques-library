module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'plugin:prettier/recommended'],
  "plugins": [
    "react-hooks"
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': "error",
    'react-hooks/exhaustive-deps': "off",
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/require-default-props': 'off', // Disable requiring default prop values for optional props
    'react/no-unescaped-entities': 'off', // Disable unescaped entities checking
    'react/jsx-props-no-spreading': 'off', // Allow spreading props
    'react/button-has-type': 'warn', // Warn about missing button type
    'react/function-component-definition': [
      1,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn', // Enable no-unused-vars
    '@typescript-eslint/no-implied-eval': 'off', // Disable because of performance issues
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off', // interface start with capital I
    '@typescript-eslint/no-explicit-any': 'off', // allow "any" as type
    '@typescript-eslint/ban-ts-ignore': 'off', // allow @ts-ignore for testing purposes
    'import/prefer-default-export': 'off', // Allow single export per module
    'import/order': 'off', // Disable import order
    'jsx-a11y/click-events-have-key-events': 'warn', // Warn about click events without key events
    'jsx-a11y/no-static-element-interactions': 'warn', // Warn about static elements
    "no-restricted-exports": "warn",
    "react/no-unknown-property": "off",
    "import/extensions": "off",
    'prettier/prettier': [
      // Enable prettier rules
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-template': 'off', // Disable prefer-template
    'no-nested-ternary': 'off', // Disable nested ternary
    'no-console': 'warn',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
}
