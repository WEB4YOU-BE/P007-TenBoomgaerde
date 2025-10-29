// @ts-check

import jseslint from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    // Files selector (optional, mirrors previous first arg)
    { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"] },

    // Global ignores
    globalIgnores([
        "node_modules/**",
        "**/.*",
        "**/.*/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),

    // Base + TypeScript configs
    jseslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

    // Extra TypeScript parser options
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                sourceType: "module",
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // TanStack Query
    query.configs["flat/recommended"]
);
