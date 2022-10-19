module.exports = {
  extends: ['@sweetalert2/eslint-config', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'no-console': 0,
  },
}
