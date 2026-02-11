import nextPlugin from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = [
  {
    ignores: [
      '.now/*',
      '*.css',
      '.changeset',
      'dist',
      'esm/*',
      'public/*',
      'e2e/*',
      'scripts/*',
      '*.config.js',
      '.DS_Store',
      'node_modules',
      'coverage',
      '.next',
      'build',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      /**
       * Enforce a convention in the order of import statements
       * @see https://github.com/lydell/eslint-plugin-simple-import-sort/tree/main
       */
      'simple-import-sort/imports': [
        'error',
        {
          /**
           * The default grouping, but with type imports first as a separate
           * group, sorting that group like non-type imports are grouped.
           * @see https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
           */
          groups: [
            ['^node:.*\\u0000$', '^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$', '^@/types'], // types
            ['^\\u0000'],
            ['^'], // side effect imports
            ['^@'], // alias
            ['^\\.'], // sibling
            ['^.+\\.css$'], // styles in the end...
          ],
        },
      ],

      // General
      'no-console': 'off',
      // -- types can be imported separately
      'no-duplicate-imports': 'off',

      // Next.js
      'import/no-anonymous-default-export': 'off',

      // Prettier
      'prettier/prettier': 'warn',

      // React
      'react/display-name': 'off',
      'react/button-has-type': 'off',

      // Typescript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },
];

export default eslintConfig;
