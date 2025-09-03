import type { Plugin } from "@/types/middleware/plugin";
import type { Stack } from "@/types/middleware/stack";

import { pluginDefault } from "@/middlewares/plugins";

const stack: Stack = async ({ event, plugins, request }) => {
    if (plugins.length === 0) return pluginDefault(() => void 0);

    const [plugin, ...rest] = plugins;
    const next = (await stack({
        event,
        plugins: rest,
        request,
    })) as ReturnType<Plugin>;
    return plugin(next);
};

export default stack;
