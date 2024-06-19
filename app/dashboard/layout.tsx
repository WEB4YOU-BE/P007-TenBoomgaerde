import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | VZW Ten Boomgaerde Lichtervelde",
    template: "%s | Dashboard | VZW Ten Boomgaerde Lichtervelde",
  },

  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
  },
};

export default async function Layout({ children }: { children: ReactNode }) {
  return children;
}
