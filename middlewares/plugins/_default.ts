import { NextResponse } from "next/server";

import { Plugin } from "@/types/middleware/plugin";

const plugin: Plugin = () => async () => NextResponse.next();
export default plugin;
