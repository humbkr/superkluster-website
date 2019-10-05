module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      'jsx': true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '16.3.1',
    },
  },
  extends: [
    'airbnb',
  ],
  plugins: [
    'react',
  ],
  // Custom rules.
  rules: {
    'linebreak-style': [2, 'unix'],
    'semi': [2, 'never'],
    'global-require': 'off',
    'import/export': 'error',
    'import/first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'import/no-duplicates': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-assign': ['error'],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'no-empty': 'error',
    'capitalized-comments': [
      'warn',
      'always',
      { ignoreConsecutiveComments: true },
    ],
    'no-inline-comments': 'warn',
    'prefer-destructuring': ['warn', {
      'array': true,
      'object': true
    }, {
      'enforceForRenamedProperties': false
    }],
    'no-confusing-arrow': ['warn', { 'allowParens': false }],
    'arrow-parens': ["error", "always"],
    'no-plusplus': ['off'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],
    // Empty destructuring crashes expo builds.
    'no-empty-pattern': ['error'],
    'no-use-before-define': ['error', { 'functions': true, 'classes': true, 'variables': false }],
    'react/destructuring-assignment': [0, 'never', { 'ignoreClassFields': true }],
    'react/jsx-one-expression-per-line': [0, {'allow': 'single-child'}],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
  },
};
