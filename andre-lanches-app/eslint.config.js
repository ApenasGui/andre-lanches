const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/**', 'coverage/**'] },
  {
    files: ['__tests__/**', 'jest.setup.js'],
    languageOptions: { globals: { jest: 'readonly', test: 'readonly', expect: 'readonly', afterEach: 'readonly' } },
  },
]);
