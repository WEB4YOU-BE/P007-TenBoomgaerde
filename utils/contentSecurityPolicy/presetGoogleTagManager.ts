import { CSPDirectives, nonce } from "csp-header";

const preset: (hash: string) => Partial<CSPDirectives> = (hash) => ({
    "script-src": [nonce(hash)],
    "connect-src": ["www.googletagmanager.com"],
    "img-src": ["www.googletagmanager.com"],
});
export default preset;
