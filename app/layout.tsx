import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/index.scss";
import Navbar from "@/uikits/nav";

const helvetica1 = localFont({
  src: "./fonts/HelveticaNeueBold.otf",
  variable: "--HelveticaNeueBold",
  weight: "900",
});

const helvetica2 = localFont({
  src: "./fonts/HelveticaNeueLight.otf",
  variable: "--HelveticaNeueLight",
  weight: "100",
});

const helvetica3 = localFont({
  src: "./fonts/HelveticaNeueMedium.otf",
  variable: "--HelveticaNeueMedium",
  weight: "100",
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
      <body
        className={`${helvetica1.variable} ${helvetica2.variable}  ${helvetica3.variable}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}