module.exports = {
  extends: ['@sweetalert2/eslint-config', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
  },
}
