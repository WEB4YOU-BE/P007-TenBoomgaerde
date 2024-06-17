"use client";

import { Suspense, type ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    const queryClient = new QueryClient();

    return <>
        <QueryClientProvider client={queryClient}>
            <Suspense>
                {children}
            </Suspense>
        </QueryClientProvider>
    </>
}

export default Providers