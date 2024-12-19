import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Nav from "@/components/ui/nav";

const poppins = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
export const metadata: Metadata = {
  title: "Alpha Kids",
  description: "Learn French with Fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased `}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
