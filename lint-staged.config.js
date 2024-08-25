const config = {
    "*.{js,jsx,ts,tsx}": [
        "prettier --write --ignore-path .gitignore .",
        "eslint --fix",
        "eslint",
    ],
    "*.{json,md,yml}": ["prettier --write --ignore-path .gitignore ."],
};
export default config;
