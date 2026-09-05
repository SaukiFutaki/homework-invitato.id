import { RsvpContent } from "@/components/dashboard/rsvp-content";
import { caller } from "@/lib/trpc/server";

export default async function RsvpPage() {
  const result = await caller.rsvp.adminList();
  return <RsvpContent result={result} />;
}
