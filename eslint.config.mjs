import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.now/*',
      '*.css',
      '.changeset',
      'dist',
      'esm/*',
      'public/*',
      'tests/*',
      'scripts/*',
      '*.config.js',
      '.DS_Store',
      'node_modules',
      'coverage',
      '.next',
      'build',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended', 'prettier'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
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
