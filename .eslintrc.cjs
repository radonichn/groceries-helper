/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
    'no-trailing-spaces': ['error', { 'ignoreComments': true }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'object-curly-spacing': ['error', 'always'],
  },
}
