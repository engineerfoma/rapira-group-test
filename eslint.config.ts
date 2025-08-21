import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import pluginVitest from '@vitest/eslint-plugin';
import typescriptEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default typescriptEslint.config(
    {
        ignores: [
            '*.d.ts',
            '**/coverage/**',
            '**/dist-ssr/**',
            '**/dist/**',
        ],
    },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
        ],
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parser: vueParser,
            parserOptions: {
                parser: typescriptEslint.parser,
                extraFileExtensions: ['.vue']
            },
        },
        rules: {
            // Отступы в JS/TS-коде: 4 пробела
            indent: ['error', 4],

            // Отступы в HTML-шаблонах Vue: 4 пробела
            'vue/html-indent': ['error', 4],

            // Обязательные точки с запятой
            semi: ['error', 'always'],

            // Запрет пробела перед скобками в функциях
            'space-before-function-paren': ['error', 'never'],

            // Запрет пробелов в конце строк
            'no-trailing-spaces': 'error',

            // Пробелы внутри {} в Vue-шаблонах
            'vue/object-curly-spacing': ['error', 'always'],

            // Пробелы вокруг операторов (например: a + b вместо a+b)
            'space-infix-ops': 'error',
            'vue/space-infix-ops': 'error',

            // Пробелы вокруг стрелки в стрелочных функциях
            'arrow-spacing': ['error', { before: true, after: true }],
            'vue/arrow-spacing': ['error', { before: true, after: true }],

            // Пробелы внутри {} в JS/TS-коде
            'object-curly-spacing': ['error', 'always'],

            // Отключение проверки расширений в импортах
            'import/extensions': 'off',

            // Разрешение импортов без полного пути
            'import/no-unresolved': 'off',

            // Отключение стандартной проверки неиспользуемых переменных
            'no-unused-vars': 'off',

            // Проверка неиспользуемых переменных через TypeScript (лучше для TS)
            '@typescript-eslint/no-unused-vars': ['error'],

            // Отключение стандартной проверки переопределения переменных
            'no-shadow': 'off',

            // Проверка переопределения переменных через TypeScript
            '@typescript-eslint/no-shadow': ['error'],

            // Разрешение дублирования методов в классах (нужно для TS-перегрузки)
            'no-dupe-class-members': 'off',

            // Убирает пустые строки внутри объектов в Vue-шаблонах
            'vue/object-curly-newline': ['error', {
                multiline: true,
                consistent: true,
                minProperties: 2,
            }],

            // Запрещает свойства в одной строке для шаблонов
            'vue/object-property-newline': ['error', {
                allowAllPropertiesOnSameLine: false,
            }],

            // Убирает пробел после запятой
            'comma-spacing': ['error', { before: false, after: true }],

            // Запрещает два и более пробелов подряд
            'no-multi-spaces': ['error', {
                ignoreEOLComments: false, // Проверять пробелы в конце строк
                exceptions: {
                    // Разрешить пробелы в импортах (опционально)
                    'ImportDeclaration': true
                }
            }],

            'vue/comma-spacing': ['error', {
                before: false,
                after: true
            }],

            'vue/no-multi-spaces': ['error', {
                ignoreProperties: false
            }]
        },
    },
    // Конфиг для Vitest (unit-тесты)
    {
        files: ['src/**/__tests__/*'],
        ...pluginVitest.configs.recommended,
        rules: {
            // Отключаем Playwright-правила для Vitest
            'playwright/no-standalone-expect': 'off'
        }
    },
);