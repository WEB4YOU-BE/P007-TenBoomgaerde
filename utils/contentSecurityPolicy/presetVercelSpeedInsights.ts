import { nonce, type CSPDirectives } from "csp-header";

const preset: (hash: string) => Partial<CSPDirectives> = (hash) => ({
    "script-src": ["https://va.vercel-scripts.com", nonce(hash)],
});
export default preset;
