module.exports = {
  extends: ['@sweetalert2/eslint-config', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 0,
  },
}
