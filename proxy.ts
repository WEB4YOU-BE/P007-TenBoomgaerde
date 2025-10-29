import proxyFunction from "@/proxies/proxy";

export default proxyFunction;

export const config = { matcher: "/:path*" };
