import type { NextFetchEvent, NextRequest, NextProxy } from "next/server";

import type { Plugin } from "./plugin";

export type Stack = (props: StackProps) => Promise<NextProxy>;
export interface StackProps {
    event: NextFetchEvent;
    plugins: Plugin[];
    request: NextRequest;
}
