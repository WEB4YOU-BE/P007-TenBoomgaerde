import { NextResponse } from "next/server";

import type { Stack } from "@/types/middleware/stack";

const stack: Stack = async ({ plugins, request, event }) => {
    console.log("Stack middleware is called");
    return new NextResponse(request.body, request);
};
export default stack;
