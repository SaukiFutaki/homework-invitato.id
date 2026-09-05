import { AdminLoginForm } from "@/components/auth/admin-login-form";

type LoginSearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "/dashboard";
  const rejected = params.error === "not-admin";
  const error =
    params.error === "oauth"
      ? "Google sign-in could not be started. Please try again."
      : undefined;

  return (
    <AdminLoginForm callbackUrl={callbackUrl} rejected={rejected} error={error} />
  );
}
