const config = {
    "*.{js,jsx,ts,tsx}": ["npm run -s format:fix", "eslint --fix", "eslint"],
    "*.{json,md,yml}": ["npm run -s format:fix"],
};
export default config;
