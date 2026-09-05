import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toasty } from "@cloudflare/kumo";
import { TRPCReactProvider } from "@/lib/trpc/client";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricky & Fellycia | The Wedding",
  description: "The wedding celebration of Ricky and Fellycia.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Toasty>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Toasty>
      </body>
    </html>
  );
}
