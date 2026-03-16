import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Privileges",
};

export default function PrivilegesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
