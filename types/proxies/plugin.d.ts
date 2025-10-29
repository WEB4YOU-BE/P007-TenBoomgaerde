import { NextProxy } from "next/server";

export type Plugin = (next: NextProxy) => NextProxy;
