import jest from 'eslint-plugin-jest';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '**/.vscode',
      '**/api',
      '**/node_modules',
      '**/samples',
      '**/*.md',
      '**/*.json',
      '**/*.log',
      '**/.DS_Store',
      '**/LICENSE'
    ]
  },
  ...compat.extends('plugin:prettier/recommended'),
  {
    plugins: {
      jest
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...jest.environments.globals.globals,
        Promise: true,
        global: true
      },

      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,

        ecmaFeatures: {
          jsx: true
        }
      }
    },

    rules: {
      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],

      'default-case': 'error',
      'linebreak-style': ['error', 'unix'],
      semi: ['error', 'always'],
      'no-console': 'error',
      'no-undef': 'error',
      'no-var': 'error',
      'no-caller': 'error',
      'no-throw-literal': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-const': 'error',

      'comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],

      'comma-style': ['error', 'last'],
      'handle-callback-err': ['error', '^(err|error)$'],

      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: false,
          caughtErrors: 'none'
        }
      ]
    }
  }
];
