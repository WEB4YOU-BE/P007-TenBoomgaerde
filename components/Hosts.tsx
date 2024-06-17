import { Toaster as ShadCNToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

import { SpeedInsights } from "@vercel/speed-insights/next"

const Hosts = () => {
    return <>
        <ShadCNToaster />
        <SonnerToaster />
        <SpeedInsights />
    </>
}

export default Hosts