import { Toaster as ShadCNToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const Hosts = () => {
    return <>
        <ShadCNToaster />
        <SonnerToaster />
        <SpeedInsights />
        <Analytics />
    </>
}

export default Hosts