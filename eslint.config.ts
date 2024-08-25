// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import prettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    prettierRecommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "prettier/prettier": "error",
        },
    }
);
