import { CSPDirectives, nonce } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "script-src": ["https://*.googletagmanager.com"],
    "img-src": [
        "https://*.google-analytics.com",
        "https://*.googletagmanager.com",
    ],
    "connect-src": [
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
    ],
};
export default preset;
