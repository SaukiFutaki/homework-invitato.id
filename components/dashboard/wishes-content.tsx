import { AdminPage, StatusBadge } from "@/components/dashboard/admin-page";
import type { Wish } from "@/lib/db/schemas/wish";

export function WishesContent({ result }: { result: { rows: Wish[]; published: number; pending: number; hidden: number } }) {
  return <AdminPage title="Wishes" current="Wishes" description="Review messages and wishes submitted by invited guests." action="Add wish" metrics={[{ label: "Published", value: String(result.published) }, { label: "Pending", value: String(result.pending) }, { label: "Hidden", value: String(result.hidden) }]} columns={[{ key: "name", label: "Name" }, { key: "message", label: "Message" }, { key: "status", label: "Status" }]} rows={result.rows.map((row) => ({ name: row.name, message: row.message, status: <StatusBadge>{row.status}</StatusBadge> }))} />;
}
