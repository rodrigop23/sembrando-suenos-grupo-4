import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBarWrapper from "@/components/global/navbar/navbar-wrapper";
import Footer from "@/components/global/footer";
import { Suspense } from "react";
import GlobalLoading from "@/components/global/global-loading";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Sembrando Sueños",
  description: "Aplicación web para Sembrando Sueños",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <NavBarWrapper />
        <main className="flex-1 flex flex-col">
          <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
        </main>
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
