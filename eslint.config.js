import globals from 'globals';
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            globals: {
                ...Object.fromEntries(
                    Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
                ),
                ...Object.fromEntries(
                    Object.entries(globals.node).map(([key, value]) => [key.trim(), value])
                ),
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        ...js.configs.recommended, 
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: {
            react: pluginReact,
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
