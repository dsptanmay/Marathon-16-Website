import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers-wrapper";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Marathon 16.0",
  description: "Created by PathFinder Volunteers",
  authors: [
    { name: "Tanmay Deshpande" },
    { name: "Aveek Chakraborty" },
    { name: "Yuvraj Singh" },
    { name: "Aviral Sharma" },
    { name: "Parth" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${font.className} antialiased`}>{children}</body>
      </Providers>
    </html>
  );
}
