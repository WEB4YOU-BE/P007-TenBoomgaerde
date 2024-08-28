import { NextResponse } from "next/server";

import type { Stack } from "@/types/middleware/stack";

const stack: Stack = async ({ plugins, request, event }) => {
    return NextResponse.next();
};
export default stack;
