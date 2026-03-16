import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GhostPass — Lease Elite Gaming Privileges",
    template: "%s | GhostPass",
  },
  description:
    "TEE-enforced rental marketplace for Soulbound Token utilities on Solana. Lease gaming privileges without transferring ownership — powered by the Liquefaction protocol (IC3).",
  keywords: [
    "GhostPass",
    "SBT",
    "Soulbound Token",
    "TEE",
    "Liquefaction",
    "Solana",
    "gaming privileges",
    "key encumbrance",
    "dstack",
    "IC3",
    "rental marketplace",
  ],
  authors: [{ name: "Anyadike Divine" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "GhostPass — Lease Elite Gaming Privileges",
    description:
      "TEE-enforced utility leasing for Soulbound Tokens on Solana. No ownership transfer. Powered by the Liquefaction protocol.",
    siteName: "GhostPass",
    type: "website",
    images: [{ url: "/hero.png", width: 1200, height: 630, alt: "GhostPass" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostPass — Lease Elite Gaming Privileges",
    description:
      "TEE-enforced utility leasing for Soulbound Tokens on Solana. Powered by Liquefaction (IC3).",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen bg-bg-dark text-paper">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
