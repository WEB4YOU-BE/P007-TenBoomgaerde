import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Tools from "@/components/Tools";
import Hosts from "@/components/Hosts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VZW Ten Boomgaerde Lichtervelde",
    template: "%s | VZW Ten Boomgaerde Lichtervelde",
  },

  applicationName: "VZW Ten Boomgaerde Lichtervelde",
  keywords: ["Ten Boomgaerde", "Lichtervelde", "Zaal verhuur"],

  appleWebApp: {
    title: "VZW Ten Boomgaerde Lichtervelde",
    statusBarStyle: "default",
  },

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    url: false,
    email: false,
    telephone: false,
    address: false,
    date: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  generator: "Next.js",
  creator: "WEB4YOU",
  authors: [
    { name: "Jens Penneman", url: "https://jenspenneman.com/" },
    { name: "Tiebe Deweerdt" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body className={inter.className}>
        <Providers>
          {children}
          <Hosts />
          <Tools />
        </Providers>
      </body>
    </html>
  );
}
