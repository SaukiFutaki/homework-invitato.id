import { AdminPage, StatusBadge } from "@/components/dashboard/admin-page";

export default function NotesPage() {
  return (
    <AdminPage
      title="Notes"
      current="Notes"
      description="Review messages and wishes submitted by invited guests."
      action="Add note"
      metrics={[
        { label: "Published", value: "57" },
        { label: "Pending", value: "6" },
        { label: "Hidden", value: "2" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "message", label: "Message" },
        { key: "status", label: "Status" },
      ]}
      rows={[
        {
          name: "Nadya",
          message: "May your days be gentle, bright, and full of grace.",
          status: <StatusBadge>Published</StatusBadge>,
        },
        {
          name: "Arif",
          message: "Wishing you a lifetime of meaningful little moments.",
          status: <StatusBadge>Published</StatusBadge>,
        },
        {
          name: "Sasha",
          message: "So happy to celebrate this beautiful chapter with you.",
          status: <StatusBadge>Pending</StatusBadge>,
        },
      ]}
    />
  );
}
