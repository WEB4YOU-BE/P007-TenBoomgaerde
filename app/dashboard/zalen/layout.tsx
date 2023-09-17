import React from "react";

export const dynamic = 'force-dynamic'

interface LayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default async function layout(props: LayoutProps) {
    return <>
        {props.children}
        <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 ml-[320px]"}>
            {props.modal}
        </div>
    </>
}