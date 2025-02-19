// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import jseslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    {
        ignores: [
            "**/node_modules/**",
            "**/.next/**",
            "**/.vercel/**",
            "**/supabase/.branches/**",
            "**/supabase/.temp/**",
        ],
    },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    jseslint.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    perfectionist.configs["recommended-natural"],
    {
        rules: {
            "perfectionist/sort-array-includes": ["error"],
            "perfectionist/sort-classes": ["error"],
            "perfectionist/sort-enums": ["error"],
            "perfectionist/sort-exports": ["error"],
            "perfectionist/sort-imports": ["error"],
            "perfectionist/sort-interfaces": ["error"],
            "perfectionist/sort-intersection-types": ["error"],
            "perfectionist/sort-jsx-props": ["error"],
            "perfectionist/sort-maps": ["error"],
            "perfectionist/sort-named-exports": ["error"],
            "perfectionist/sort-named-imports": ["error"],
            "perfectionist/sort-object-types": ["error"],
            "perfectionist/sort-objects": ["error"],
            "perfectionist/sort-sets": ["error"],
            "perfectionist/sort-switch-case": ["error"],
            "perfectionist/sort-union-types": ["error"],
            "perfectionist/sort-variable-declarations": ["error"],
        },
        settings: {
            perfectionist: {
                ignoreCase: true,
                order: "asc",
                type: "natural",
            },
            react: {
                version: "detect",
            },
        },
    },
];

export default config;
