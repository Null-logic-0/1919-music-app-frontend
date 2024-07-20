import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "./helpers/RecoilWrapper/RecoilWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1919 music app",
  description: "Generated by 1919 dev tem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilWrapper>
          {children}
        </RecoilWrapper>
      </body>

        {children}</body>
    </html>
  );
}
