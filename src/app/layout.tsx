import type { Metadata } from "next";
import "@/styles/globals.css";
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  weight: "400",
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--cormorant-garamond",
});

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
      <body className={`${cormorantGaramond.variable}`}>
        {children}
      </body>
    </html>
  );
}
