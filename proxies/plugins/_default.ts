import { NextResponse } from "next/server";

import { Plugin } from "@/types/proxies/plugin";

const plugin: Plugin = () => () => NextResponse.next();
export default plugin;
