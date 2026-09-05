import { WishesContent } from "@/components/dashboard/wishes-content";
import { caller } from "@/lib/trpc/server";

export default async function WishesPage() {
  const result = await caller.wishes.adminList();
  return <WishesContent result={result} />;
}
