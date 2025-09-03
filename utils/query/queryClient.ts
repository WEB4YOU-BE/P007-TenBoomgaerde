import { isServer, QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;
const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            mutations: { networkMode: "online", retry: false },
            queries: {
                networkMode: "online",
                retry: true,
                staleTime: 2 * 60 * 60 * 1000,
                throwOnError: false,
            },
        },
    });
const getQueryClient = () => {
    if (isServer) return createQueryClient();
    browserQueryClient ??= createQueryClient();
    return browserQueryClient;
};

export default browserQueryClient;
export { createQueryClient, getQueryClient };
