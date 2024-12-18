import "@/styles/globals.css";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QueryProvider from "../components/provider/RQProvider";

import { Suspense } from "react";
import Loading from "@/components/error/Loading";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "리그오브레전드 정보",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen dark:bg-gradient-to-r from-[#000] to-[#0A1428]"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <main className="flex-grow pt-16 pb-16">
                <QueryProvider>{children}</QueryProvider>
              </main>
            </Suspense>
          </ErrorBoundary>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
