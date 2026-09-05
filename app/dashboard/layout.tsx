import { AdminShell } from "@/components/dashboard/admin-shell";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function LayoutDashboard({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const hasAdminRole = session?.user.role === "admin";
  const matchesAdminEmail =
    Boolean(session?.user.email) &&
    Boolean(adminEmail) &&
    session!.user.email.toLowerCase() === adminEmail;
  const isAdmin = hasAdminRole || matchesAdminEmail;

  if (!isAdmin) {
    redirect(
      session
        ? "/admin/login?error=not-admin"
        : "/admin/login?callbackUrl=/dashboard",
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
