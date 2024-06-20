import { MiddlewareFactory } from "@/types/middleware/middlewareFactory";
import { NextMiddleware, NextResponse } from "next/server";

export default function stackMiddlewares(
  middlewares: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  if (!middlewares[index]) return () => NextResponse.next();
  return middlewares[index](stackMiddlewares(middlewares, index + 1));
}
