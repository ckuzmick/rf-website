import type { Metadata } from "next";
import "@/styles/globals.css";
import { Cormorant_Garamond, Sorts_Mill_Goudy } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  weight: "400",
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--cormorant-garamond",
});

const goudy = Sorts_Mill_Goudy({
  weight: "400",
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--goudy",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  search = true,
}: Readonly<{
  children: React.ReactNode;
  search?: boolean;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${goudy.variable}`}>
        {/* <Header search={search} /> */}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
