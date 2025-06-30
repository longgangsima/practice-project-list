module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Add any custom rules here
    'no-console': 'off', // Allow console.log in server code
    'no-unused-vars': 'warn',
  },
  globals: {
    __dirname: 'readonly',
    __filename: 'readonly',
    process: 'readonly',
    Buffer: 'readonly',
    require: 'readonly',
    module: 'readonly',
    exports: 'readonly',
  },
};
