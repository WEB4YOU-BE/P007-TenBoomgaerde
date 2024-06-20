import type { MiddlewareFactory } from "@/types/middleware/middlewareFactory";

import stackMiddlewares from "@/middlewares/_stackMiddlewareHandlers";

import { withSupabaseAuth } from "@/middlewares/supabase";

const middlewares: MiddlewareFactory[] = [withSupabaseAuth];
export default stackMiddlewares(middlewares);
