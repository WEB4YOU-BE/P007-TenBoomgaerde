import { Toaster as ShadCNToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const Hosts = () => {
  return (
    <>
      <ShadCNToaster />
      <SonnerToaster richColors />
      <SpeedInsights />
      <Analytics />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
    </>
  );
};

export default Hosts;
