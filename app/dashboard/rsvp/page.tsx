import { AdminPage, StatusBadge } from "@/components/dashboard/admin-page";

export default function RsvpPage() {
  return (
    <AdminPage
      title="RSVP"
      current="RSVP"
      description="Track who will attend, guest counts, and selected wedding events."
      action="Add RSVP"
      metrics={[
        { label: "Attending", value: "128" },
        { label: "Unable", value: "14" },
        { label: "Pending", value: "32" },
      ]}
      columns={[
        { key: "name", label: "Guest" },
        { key: "people", label: "People" },
        { key: "event", label: "Event" },
        { key: "status", label: "Status" },
      ]}
      rows={[
        {
          name: "Alicia Hart",
          people: "2",
          event: "Both Events",
          status: <StatusBadge>Attending</StatusBadge>,
        },
        {
          name: "Michael Tan",
          people: "1",
          event: "Reception",
          status: <StatusBadge>Attending</StatusBadge>,
        },
        {
          name: "Daniel Moss",
          people: "0",
          event: "-",
          status: <StatusBadge>Unable</StatusBadge>,
        },
      ]}
    />
  );
}
