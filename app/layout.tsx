import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotificationWrapper from "./_components/notification-wrapper";
import { SessionProvider } from "next-auth/react";

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
      <body className={inter.className + " bg-[#858585]"}>
        <SessionProvider>
          {children}
          <NotificationWrapper />
        </SessionProvider>
      </body>
    </html>
  );
}
