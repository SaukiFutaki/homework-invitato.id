import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricky & Fellycia | The Wedding",
  description: "The wedding celebration of Ricky and Fellycia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
