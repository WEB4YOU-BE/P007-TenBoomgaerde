import { BLOB, CSPDirectives, DATA, nonce, UNSAFE_INLINE } from "csp-header";

const preset: (hash: string) => Partial<CSPDirectives> = (hash) => ({
    "script-src": ["https://vercel.live", nonce(hash)],
    "connect-src": ["https://vercel.live", "wss://ws-us3.pusher.com"],
    "img-src": ["https://vercel.live", "https://vercel.com", DATA, BLOB],
    "frame-src": ["https://vercel.live"],
    "style-src": ["https://vercel.live", UNSAFE_INLINE, nonce(hash)],
    "font-src": ["https://vercel.live", "https://assets.vercel.com"],
});
export default preset;
