import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ApplicationProvider from "./_provider/application-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "bg-background-light text-text-light  dark:bg-background-dark dark:text-text-dark"}>
        <ApplicationProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ApplicationProvider>
      </body>
    </html>
  );
}
