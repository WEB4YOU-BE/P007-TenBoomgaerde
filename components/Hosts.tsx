import { Toaster as ShadCNToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import { GoogleTagManager } from '@next/third-parties/google'

const Hosts = () => {
    return <>
        <ShadCNToaster />
        <SonnerToaster />
        <SpeedInsights />
        <Analytics />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
    </>
}

export default Hosts