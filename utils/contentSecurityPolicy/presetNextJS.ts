import { CSPDirectives, SELF, UNSAFE_INLINE } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "default-src": [SELF],

    "style-src": [SELF, UNSAFE_INLINE],
    "script-src": [SELF, UNSAFE_INLINE],
};
export default preset;
