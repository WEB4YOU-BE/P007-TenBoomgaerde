import { FC } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { VercelToolbar } from "@vercel/toolbar/next";
import { headers } from "next/headers";

const development = process.env.NODE_ENV === "development";
const Tools: FC = () => (
    <>
        <ReactQueryDevtools
            styleNonce={headers().get("x-nonce") || undefined}
        />
        {development && (
            <VercelToolbar nonce={headers().get("x-nonce") || undefined} />
        )}
    </>
);

export default Tools;
