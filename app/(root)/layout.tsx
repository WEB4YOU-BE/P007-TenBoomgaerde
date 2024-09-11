import { Header } from "@/components/ui/root";
import { Footer } from "@/components/ui/root";
import React from "react";

export default async function PublicNavigationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
