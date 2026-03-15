import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import { ToastProvider } from "@/components/ui/Toast";
import WalletConnectModal from "@/components/wallet/WalletConnectModal";

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
  title: "GhostPass",
  description: "Lease Elite Gaming Privileges Without Transferring Ownership",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
        <WalletProvider>
          <ToastProvider>
            {children}
            <WalletConnectModal />
          </ToastProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
