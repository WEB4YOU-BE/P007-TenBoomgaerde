import { CSPDirectives, SELF } from "csp-header";

const preset: (hash: string) => Partial<CSPDirectives> = (hash) => ({
    "default-src": [SELF],

    "style-src": [SELF],
    "font-src": [SELF],
    "script-src": [SELF],

    "img-src": [SELF],
    "media-src": [SELF],

    "connect-src": [SELF, "http://localhost:43214", "https://localhost:43214"],

    "upgrade-insecure-requests": true,
});
export default preset;
