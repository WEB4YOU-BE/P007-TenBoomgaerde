"use client"

import type { ReactNode } from "react"
import { Toaster as ShadCNToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient()

    return <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        <ShadCNToaster />
        <SonnerToaster />
    </>
}

export default Providers