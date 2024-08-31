import { FC } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { VercelToolbar } from "@vercel/toolbar/next";
import { headers } from "next/headers";

const development = process.env.NODE_ENV === "development";
const Tools: FC = () => {
    const nonce = headers().get("x-nonce") ?? undefined;
    return (
        <>
            <ReactQueryDevtools styleNonce={nonce} />
            {development && <VercelToolbar nonce={nonce} />}
        </>
    );
};

export default Tools;
