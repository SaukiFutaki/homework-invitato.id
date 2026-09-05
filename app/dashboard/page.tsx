import { OverviewContent } from "@/components/dashboard/overview-content";
import { caller } from "@/lib/trpc/server";

export default async function DashboardPage() {
  const {
    email,
    rsvpRows,
    wishRows,
    attending,
    pendingWishes,
    totalRsvp,
    totalWishes,
  } = await caller.dashboard.overview();

  return (
    <OverviewContent
      email={email}
      rsvpRows={rsvpRows}
      wishRows={wishRows}
      attending={attending}
      pendingWishes={pendingWishes}
      totalRsvp={totalRsvp}
      totalWishes={totalWishes}
    />
  );
}
