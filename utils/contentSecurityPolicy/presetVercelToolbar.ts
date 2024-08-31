import { BLOB, CSPDirectives, DATA, UNSAFE_INLINE } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "script-src": ["https://vercel.live"],
    "connect-src": ["https://vercel.live", "wss://ws-us3.pusher.com"],
    "img-src": ["https://vercel.live", "https://vercel.com", DATA, BLOB],
    "frame-src": ["https://vercel.live"],
    "style-src": ["https://vercel.live", UNSAFE_INLINE],
    "font-src": ["https://vercel.live", "https://assets.vercel.com"],
};
export default preset;
