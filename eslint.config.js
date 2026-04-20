import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'public/mockServiceWorker.js']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      boundaries,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'mocks', pattern: 'src/mocks/**' },
      ],
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^react-dom$', '^react-router-dom$', '^@?\\w'],
            ['^@/app(/.*|$)', '^src/app(/.*|$)', '^\\.{1,2}/+app(/.*|$)'],
            ['^@/pages(/.*|$)', '^src/pages(/.*|$)', '^\\.{1,2}/+pages(/.*|$)'],
            ['^@/widgets(/.*|$)', '^src/widgets(/.*|$)', '^\\.{1,2}/+widgets(/.*|$)'],
            ['^@/features(/.*|$)', '^src/features(/.*|$)', '^\\.{1,2}/+features(/.*|$)'],
            ['^@/entities(/.*|$)', '^src/entities(/.*|$)', '^\\.{1,2}/+entities(/.*|$)'],
            ['^@/shared(/.*|$)', '^src/shared(/.*|$)', '^\\.{1,2}/+shared(/.*|$)'],
            ['^@/mocks(/.*|$)', '^src/mocks(/.*|$)', '^\\.{1,2}/+mocks(/.*|$)'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.(css|scss)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'app' },
              allow: {
                to: {
                  type: ['app', 'pages', 'widgets', 'features', 'entities', 'shared', 'mocks'],
                },
              },
            },
            {
              from: { type: 'pages' },
              allow: { to: { type: ['pages', 'widgets', 'features', 'entities', 'shared'] } },
            },
            {
              from: { type: 'widgets' },
              allow: { to: { type: ['widgets', 'features', 'entities', 'shared'] } },
            },
            {
              from: { type: 'features' },
              allow: { to: { type: ['features', 'entities', 'shared'] } },
            },
            {
              from: { type: 'entities' },
              allow: { to: { type: ['entities', 'shared'] } },
            },
            {
              from: { type: 'shared' },
              allow: { to: { type: ['shared'] } },
            },
            {
              from: { type: 'mocks' },
              allow: { to: { type: ['mocks', 'shared'] } },
            },
          ],
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  eslintConfigPrettier,
]);
