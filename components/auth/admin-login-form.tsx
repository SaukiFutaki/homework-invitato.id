"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, LayerCard } from "@cloudflare/kumo";

import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth/client";

export function AdminLoginForm({
  callbackUrl,
  error,
  rejected,
}: {
  callbackUrl: string;
  error?: string;
  rejected: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const signInWithGoogle = () => {
    startTransition(async () => {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
      if (result.error) {
        router.push("/admin/login?error=oauth");
      }
    });
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-kumo-recessed px-6 py-12">
      <LayerCard className="w-full max-w-md p-8 sm:p-10">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-kumo-subtle">
            Ricky &amp; Fellycia
          </p>
          <h1 className="mt-5 text-3xl font-semibold text-kumo-strong">
            Admin sign in
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-kumo-subtle">
            Sign in with the authorized Google account to manage the invitation.
          </p>
        </div>
        {(rejected || error) && (
          <p className="mt-6 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-center text-sm text-red-800">
            {rejected
              ? "This Google account is not authorized for the dashboard."
              : error}
          </p>
        )}
        <Button
          type="button"
          onClick={signInWithGoogle}
          disabled={isPending}
          loading={isPending}
          icon={<FcGoogle size={18} />}
          variant="primary"
          size="lg"
          className="mt-8 flex w-full items-center justify-center"
        >
          Continue with Google
        </Button>
      </LayerCard>
    </main>
  );
}
