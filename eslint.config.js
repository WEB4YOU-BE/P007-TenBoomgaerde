import { FlatCompat } from "@eslint/eslintrc";
import jseslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
            "**/.vercel/**",
            "**/supabase/.branches/**",
            "**/supabase/.temp/**",
            "**/.*",
        ],
    },

    // Next.js and TypeScript base configs
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // Language options
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                projectService: true,
                sourceType: "module",
                tsconfigRootDir: __dirname,
            },
        },
    },
    // Plugin configs
    jseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    pluginReact.configs.flat.recommended,
    perfectionist.configs["recommended-natural"],
    ...pluginQuery.configs["flat/recommended"],
    // Custom rules and settings
    {
        rules: {
            "@typescript-eslint/no-deprecated": "error",
            "perfectionist/sort-array-includes": "error",
            "perfectionist/sort-classes": "error",
            "perfectionist/sort-enums": "error",
            "perfectionist/sort-exports": "error",
            "perfectionist/sort-heritage-clauses": "error",
            "perfectionist/sort-imports": "error",
            "perfectionist/sort-interfaces": "error",
            "perfectionist/sort-intersection-types": "error",
            "perfectionist/sort-jsx-props": "error",
            "perfectionist/sort-maps": "error",
            "perfectionist/sort-named-exports": "error",
            "perfectionist/sort-named-imports": "error",
            "perfectionist/sort-object-types": "error",
            "perfectionist/sort-objects": "error",
            "perfectionist/sort-sets": "error",
            "perfectionist/sort-switch-case": "error",
            "perfectionist/sort-union-types": "error",
            "perfectionist/sort-variable-declarations": "error",
        },
        settings: {
            perfectionist: { ignoreCase: true, order: "asc", type: "natural" },
            react: { version: "detect" },
        },
    },
];

export default config;
