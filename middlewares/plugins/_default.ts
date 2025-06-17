import { NextResponse } from "next/server";

import { Plugin } from "@/types/middleware/plugin";

const plugin: Plugin = () => () => NextResponse.next();
export default plugin;
