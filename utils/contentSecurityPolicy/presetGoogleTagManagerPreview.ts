import { CSPDirectives, DATA, nonce } from "csp-header";

const preset: (hash: string) => Partial<CSPDirectives> = (hash) => ({
    "script-src": [
        "https://googletagmanager.com",
        "https://tagmanager.google.com",
        nonce(hash),
    ],
    "style-src": [
        "https://googletagmanager.com",
        "https://tagmanager.google.com",
        "https://fonts.googleapis.com",
        nonce(hash),
    ],
    "img-src": [
        "https://googletagmanager.com",
        "https://ssl.gstatic.com",
        "https://www.gstatic.com",
    ],
    "font-src": ["https://fonts.gstatic.com", DATA],
});
export default preset;
