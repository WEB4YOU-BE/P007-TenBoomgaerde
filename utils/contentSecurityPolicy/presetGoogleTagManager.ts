import { CSPDirectives } from "csp-header";

const preset: Partial<CSPDirectives> = {
    "connect-src": ["www.googletagmanager.com"],
    "img-src": ["www.googletagmanager.com"],
    "script-src": ["https://www.googletagmanager.com"],
};
export default preset;
