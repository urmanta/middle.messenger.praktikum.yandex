import globals from "globals";
import tseslint from "typescript-eslint";
import airbnbBaseConfig from "eslint-config-airbnb-base";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        rules: {
            ...airbnbBaseConfig.rules
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        }
    },
    {
        ignores: ['node_modules', 'dist']
    },
    ...tseslint.configs.recommended,
];
