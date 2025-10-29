import type { Stack } from "@/types/proxies/stack";

import { pluginDefault } from "@/proxies/plugins";

const stack: Stack = async ({ event, plugins, request }) => {
    if (plugins.length === 0) return pluginDefault(() => void 0);

    const [plugin, ...rest] = plugins;
    const next = await stack({ event, plugins: rest, request });
    return plugin(next);
};

export default stack;
