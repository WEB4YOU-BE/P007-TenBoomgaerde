import { Toaster } from "@/components/atoms/sonner";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";
import { FC } from "react";

const Hosts: FC = () => (
    <>
        <Toaster richColors />
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
    </>
);
export default Hosts;
