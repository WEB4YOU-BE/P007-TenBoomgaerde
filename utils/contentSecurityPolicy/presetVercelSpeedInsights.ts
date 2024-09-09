import { type CSPDirectives } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "script-src": ["https://va.vercel-scripts.com"],
};
export default preset;
