import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = constructMetadata({
  title: 'Find Best Solar Installers & Companies in India',
  description: 'Discover top-rated solar panel installers, dealers, and service providers across India. Compare prices, read reviews, get free quotes. PM Surya Ghar Yojana available.',
});

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
