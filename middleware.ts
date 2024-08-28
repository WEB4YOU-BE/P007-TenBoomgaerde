import type { NextMiddleware } from "next/server";

import stack from "./middlewares/stack";

const middleware: NextMiddleware = async (request, event) =>
    stack({ plugins: [], request, event });
export default middleware;
