import sweetAlert2EslintConfig from '@sweetalert2/eslint-config'
import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'

export default [
  ...sweetAlert2EslintConfig,
  reactPlugin.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['cypress/**/*.js'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]
