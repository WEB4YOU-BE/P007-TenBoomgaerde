// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import jseslint from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

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

    // React recommended
    react.configs.flat.recommended,
    // React globals + settings override
    {
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            globals: { ...globals.serviceworker, ...globals.browser },
        },
        settings: { react: { version: "detect" } },
    },

    // Next.js legacy configs via compat
    ...compat.config({
        extends: [
            "next",
            "next/core-web-vitals",
            "next/typescript",
            "prettier",
        ],
    }),

    // TanStack Query
    query.configs["flat/recommended"],

    // Prettier plugin
    prettier,

    // Perfectionist plugin
    perfectionist.configs["recommended-natural"]
);
