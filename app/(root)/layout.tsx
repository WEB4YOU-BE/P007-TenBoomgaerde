import React, { type PropsWithChildren } from "react";

import { Header } from "@/components/ui/root";
import { Footer } from "@/components/ui/root";

const Layout = ({ children }: PropsWithChildren) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export default Layout;
