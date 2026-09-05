import { AdminShell } from "@/components/dashboard/admin-shell";
import type { ReactNode } from "react";

export default function LayoutDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
