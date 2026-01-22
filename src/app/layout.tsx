
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const cairo = localFont({
  src: [
    {
      path: "../../public/fonts/SST_Arabic-Medium.ttf",
      weight: "500",
      style: "normal",
    }
  ],
  variable: "--font-cairo",
  display: "swap",
});

const voltex = localFont({
  src: [{
    path: "../../public/fonts/alfont_com_MT-Voltex-Poster.otf",
    weight: "400",
    style: "normal",
  }],
  variable: "--font-voltex",
  display: "swap",
});

const sahlab = localFont({
  src: [{
    path: "../../public/fonts/alfont_com_ALLEXP03SAHLAB.otf",
    weight: "400",
    style: "normal",
  }],
  variable: "--font-sahlab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "لعبة فوق | FOQ Game",
  description: "لعبتك، جوّك، فوق! تحدى أصحابك في لعبة المعلومات العامة والتمثيل. حملها الأن!",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-white",
          cairo.variable,
          voltex.variable,
          sahlab.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
