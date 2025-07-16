"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactNode } from "react";

import { getQueryClient } from "@/utils/query/queryClient";

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
