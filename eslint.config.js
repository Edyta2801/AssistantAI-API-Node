// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021, // Dostosuj wersję ECMAScript, jeśli potrzebne
            globals: {
                console: 'readonly', // Dodaj globalne zmienne Node.js
                process: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            'constructor-super': 'off',
            'no-unused-vars': 'warn',
            'no-console': 'off', // Wyłącz błąd dla console.log
            'prettier/prettier': 'error',
        },
    },
];
