import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";
import { Gradient } from "@/components/gradient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "museverse",
  description: "We are creative beings, not productive machines",
  openGraph: {
    title: "museverse",
    description: "We are creative beings, not productive machines",
    images: [
      {
        url: "/README-cover.png",
        width: 2880,
        height: 2048,
        alt: "museverse",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/logo-favicon.svg",
        href: "/logo-favicon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={cn(inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <EdgeStoreProvider>
              <Toaster position="bottom-center" theme="dark" />
              {children}
              <Gradient />
            </EdgeStoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
