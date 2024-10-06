import globals from "globals";
import tseslint from "typescript-eslint";
import airbnbBaseConfig from "eslint-config-airbnb-base";
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import parser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['node_modules', 'dist', 'src/**/*.spec.ts']
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'chai-friendly': pluginChaiFriendly
        },
        rules: {
            ...airbnbBaseConfig.rules,
            "@typescript-eslint/no-unused-expressions": "off",
            "no-unused-expressions": "off",
            "chai-friendly/no-unused-expressions": "error"
        },
        languageOptions: {
            parser: parser,
            ecmaVersion: 12,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    ...tseslint.configs.recommended,
];
