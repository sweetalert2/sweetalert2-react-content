module.exports = {
  extends: ['@sweetalert2/eslint-config', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/named': 'off', // todo: @limonte revisit this eslint issue
  },
}
