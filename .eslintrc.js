module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx']
      }
    }
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
  },
  "ignorePatterns": ["build", "dist", "public"]
}
