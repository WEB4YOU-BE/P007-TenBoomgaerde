import React from "react";

export const dynamic = 'force-dynamic'

interface LayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default async function layout(props: LayoutProps) {
    return <>
        {props.children}
        {props.modal}
    </>
}