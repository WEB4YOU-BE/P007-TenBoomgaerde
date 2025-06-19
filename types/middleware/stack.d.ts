import type { NextFetchEvent, NextRequest } from "next/server";

import type { Plugin } from "./plugin";

export type Stack = (props: StackProps) => Promise<NextMiddleware>;
export interface StackProps {
    event: NextFetchEvent;
    plugins: Plugin[];
    request: NextRequest;
}
