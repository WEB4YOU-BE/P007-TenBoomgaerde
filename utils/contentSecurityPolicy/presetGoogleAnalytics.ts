import { CSPDirectives } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "connect-src": [
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
    ],
    "img-src": [
        "https://*.google-analytics.com",
        "https://*.googletagmanager.com",
    ],
    "script-src": ["https://*.googletagmanager.com"],
};
export default preset;
