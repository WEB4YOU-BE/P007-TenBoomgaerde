import { Header } from "@/components/ui/root";
import { Footer } from "@/components/ui/root";
import React, { type PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export default Layout;
