import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { VercelToolbar } from '@vercel/toolbar/next';

const developmentMode = process.env.NODE_ENV === "development";

const Tools = () => {
    return <>
        <ReactQueryDevtools />
        {developmentMode && <VercelToolbar />}
    </>
}

export default Tools