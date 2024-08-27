import { FC } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { VercelToolbar } from "@vercel/toolbar/next";

const development = process.env.NODE_ENV === "development";
const Tools: FC = () => (
    <>
        <ReactQueryDevtools />
        {development && <VercelToolbar />}
    </>
);

export default Tools;
