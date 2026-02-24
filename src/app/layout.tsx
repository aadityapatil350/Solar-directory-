import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solar Directory India - Find Best Solar Installers & Companies",
  description: "Discover top-rated solar panel installers, dealers, and service providers across India. Compare prices, read reviews, and go solar today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
