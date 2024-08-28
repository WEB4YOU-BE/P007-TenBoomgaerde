import type { Stack } from "@/types/middleware/stack";

import { pluginDefault } from ".";

const stack: Stack = async ({ plugins, request, event }) => {
    if (plugins.length === 0) return pluginDefault(() => {});

    const [plugin, ...rest] = plugins;
    const next = await stack({ plugins: rest, request, event });
    return plugin(next);
};
export default stack;
