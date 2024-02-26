import "./globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

import { ToasterProvider } from '@/components/toaster-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const title =
  "Platforms Starter Kit – The all-in-one starter kit for building multi-tenant applications.";
const description =
  "The Platforms Starter Kit is a full-stack Next.js app with multi-tenancy and custom domain support. Built with Next.js App Router, Vercel Postgres and the Vercel Domains API.";
const image = "https://vercel.pub/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://vercel.pub/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@vercel",
  },
  metadataBase: new URL("https://vercel.pub"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //  <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        {/* <ToasterProvider /> */}

        {/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem> */}
        {/* <Providers> */}
          {children}
          {/* <Analytics /> */}
        {/* </Providers> */}
        {/* <Toaster /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
    //  </ClerkProvider>  
  );
}
