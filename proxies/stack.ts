import type { Plugin } from "@/types/proxies/plugin";
import type { Stack } from "@/types/proxies/stack";

import { pluginDefault } from "@/proxies/plugins";

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
