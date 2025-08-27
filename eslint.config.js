// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import jseslint from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = tseslint.config(
    { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"] },
    { ignores: ["node_modules/**", "**/.*", "**/.*/*"] },

    // Enable base configs
    jseslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

    // Enable TypeScript support
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                sourceType: "module",
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // React
    react.configs.flat.all,
    {
        languageOptions: {
            ...react.configs.flat.all.languageOptions,
            globals: { ...globals.serviceworker, ...globals.browser },
        },
        settings: { react: { version: "detect" } },
    },

    // Next.js
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

export default config;
