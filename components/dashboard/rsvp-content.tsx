import { AdminPage, StatusBadge } from "@/components/dashboard/admin-page";
import type { Rsvp } from "@/lib/db/schemas/rsvp";

export function RsvpContent({ result }: { result: { rows: Rsvp[]; attending: number; declining: number; guests: number } }) {
  return <AdminPage title="RSVP" current="RSVP" description="Track who will attend, guest counts, and selected wedding events." action="Add RSVP" metrics={[{ label: "Attending", value: String(result.attending) }, { label: "Unable", value: String(result.declining) }, { label: "Guests", value: String(result.guests) }]} columns={[{ key: "name", label: "Guest" }, { key: "people", label: "People" }, { key: "event", label: "Event" }, { key: "status", label: "Status" }]} rows={result.rows.map((row) => ({ name: row.name, people: String(row.guestCount), event: row.event ?? "-", status: <StatusBadge>{row.attendance === "attending" ? "Attending" : "Unable"}</StatusBadge> }))} />;
}
