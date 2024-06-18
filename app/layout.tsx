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

  referrer: "strict-origin-when-cross-origin",

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
