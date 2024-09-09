import { BLOB, CSPDirectives, DATA, UNSAFE_INLINE } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "connect-src": ["https://vercel.live", "wss://ws-us3.pusher.com"],
    "font-src": ["https://vercel.live", "https://assets.vercel.com"],
    "frame-src": ["https://vercel.live"],
    "img-src": ["https://vercel.live", "https://vercel.com", DATA, BLOB],
    "script-src": ["https://vercel.live"],
    "style-src": ["https://vercel.live", UNSAFE_INLINE],
};
export default preset;
