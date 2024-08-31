import { CSPDirectives, nonce } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "script-src": ["https://www.googletagmanager.com"],
    "connect-src": ["www.googletagmanager.com"],
    "img-src": ["www.googletagmanager.com"],
};
export default preset;
