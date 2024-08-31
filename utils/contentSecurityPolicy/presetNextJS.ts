import { CSPDirectives, DATA, SELF, UNSAFE_INLINE } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "default-src": [SELF],

    "style-src": [SELF, UNSAFE_INLINE],
    "font-src": [SELF],
    "script-src": [SELF, UNSAFE_INLINE],

    "img-src": [SELF],
    "media-src": [SELF],
    "object-src": [SELF, DATA],

    "connect-src": [SELF],
};
export default preset;
