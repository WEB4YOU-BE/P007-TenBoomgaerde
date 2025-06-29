"use client";

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { ReactNode } from "react";

let browserQueryClient: QueryClient | undefined = undefined;
const createQueryClient = () => new QueryClient();
const getQueryClient = () => {
    if (isServer) return createQueryClient();
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
};

interface ProvidersProps {
    children: ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;
