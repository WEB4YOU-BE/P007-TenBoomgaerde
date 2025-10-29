import type { NextFetchEvent, NextProxy, NextRequest } from "next/server";

import type { Plugin } from "./plugin";

export type Stack = (props: StackProps) => Promise<NextProxy>;
export interface StackProps {
    event: NextFetchEvent;
    plugins: Plugin[];
    request: NextRequest;
}
