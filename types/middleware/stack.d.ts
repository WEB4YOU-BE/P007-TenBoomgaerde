import type { NextFetchEvent, NextRequest } from "next/server";
import type { Plugin } from "./plugin";
import { NextMiddlewareResult } from "next/dist/server/web/types";

export interface StackProps {
    plugins: Plugin[];
    request: NextRequest;
    event: NextFetchEvent;
}
export type Stack = (props: StackProps) => Promise<NextMiddleware>;
