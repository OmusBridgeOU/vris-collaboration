import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { basicConfig } from '../../eslint.config.shared.mjs'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**/*.ts', 'app/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.es2023,
        ...globals.node,
        Bun: 'readonly',
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...basicConfig.rules,
      'no-console': 'off',
    },
  },
)
