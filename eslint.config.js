const js = require('@eslint/js')

module.exports = [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        App: 'readonly',
        Page: 'readonly',
        wx: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
        console: 'readonly',
        global: 'writable',
        structuredClone: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never']
    }
  },
  { files: ['**/*.mjs'], languageOptions: { sourceType: 'module' } }
]
