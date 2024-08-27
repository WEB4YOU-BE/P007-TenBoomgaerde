// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import prettierRecommended from "eslint-plugin-prettier/recommended";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    prettierRecommended,
    ...pluginQuery.configs["flat/recommended"],
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
