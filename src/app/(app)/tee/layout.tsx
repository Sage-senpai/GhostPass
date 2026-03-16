import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TEE Dashboard",
};

export default function TEELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
