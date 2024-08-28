import { Plugin } from "@/types/middleware/plugin";
import { NextResponse } from "next/server";

const plugin: Plugin = () => async (request) => NextResponse.next(request);
export default plugin;
