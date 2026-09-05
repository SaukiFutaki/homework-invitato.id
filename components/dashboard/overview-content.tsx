"use client"
import { Badge, Breadcrumbs, Button, LayerCard, Meter, Table } from "@cloudflare/kumo";
import { DownloadSimpleIcon, HouseIcon } from "@phosphor-icons/react";

import { PageHeader } from "@/components/kumo/page-header/page-header";
import type { Rsvp } from "@/lib/db/schemas/rsvp";
import type { Wish } from "@/lib/db/schemas/wish";

export function OverviewContent({
  email,
  rsvpRows,
  wishRows,
  attending,
  pendingWishes,
  totalRsvp,
  totalWishes,
}: {
  email: string;
  rsvpRows: Rsvp[];
  wishRows: Wish[];
  attending: number;
  pendingWishes: number;
  totalRsvp: number;
  totalWishes: number;
}) {
  const latest = [
    ...rsvpRows.slice(0, 3).map((row) => ({
      name: row.name,
      type: "RSVP",
      summary: `${row.guestCount} guest${row.guestCount === 1 ? "" : "s"}${row.event ? ` · ${row.event}` : ""}`,
      status: row.attendance === "attending" ? "Attending" : "Unable",
    })),
    ...wishRows.slice(0, 3).map((row) => ({
      name: row.name,
      type: "Wish",
      summary: row.message,
      status: row.status,
    })),
  ].slice(0, 6);

  return (
    <div className="min-h-dvh bg-kumo-recessed px-4 py-4 sm:px-5">
      <PageHeader
        breadcrumbs={<Breadcrumbs><Breadcrumbs.Link icon={<HouseIcon size={16} />} href="/dashboard">Dashboard</Breadcrumbs.Link><Breadcrumbs.Separator /><Breadcrumbs.Current>Overview</Breadcrumbs.Current></Breadcrumbs>}
        title="Overview"
        description={`Signed in as ${email}.`}
        tabs={[{ label: "RSVP", value: "rsvp" }, { label: "Wishes", value: "wishes" }]}
        defaultTab="rsvp"
      >
        <Button size="sm" variant="secondary" icon={<DownloadSimpleIcon size={16} />}>Export</Button>
      </PageHeader>
      <div className="grid gap-4 py-4">
        <section className="grid gap-4 lg:grid-cols-3">
          <Metric label="RSVP responses" value={totalRsvp} customValue={`${attending} attending`} />
          <Metric label="Wishes received" value={totalWishes} customValue={`${totalWishes} messages`} />
          <Metric label="Wishes pending" value={pendingWishes} customValue={`${pendingWishes} to review`} />
        </section>
        <LayerCard className="p-0"><Table><Table.Header><Table.Row><Table.Head>Name</Table.Head><Table.Head>Type</Table.Head><Table.Head>Summary</Table.Head><Table.Head>Status</Table.Head></Table.Row></Table.Header><Table.Body>{latest.map((row, index) => <Table.Row key={`${row.type}-${row.name}-${index}`}><Table.Cell>{row.name}</Table.Cell><Table.Cell>{row.type}</Table.Cell><Table.Cell>{row.summary}</Table.Cell><Table.Cell><Badge appearance="dot" variant={row.status === "pending" ? "warning" : row.status === "Unable" ? "neutral" : "success"}>{row.status}</Badge></Table.Cell></Table.Row>)}</Table.Body></Table></LayerCard>
      </div>
    </div>
  );
}

function Metric({ label, value, customValue }: { label: string; value: number; customValue: string }) {
  return <LayerCard><LayerCard.Primary><Meter customValue={customValue} label={label} value={value} /></LayerCard.Primary></LayerCard>;
}
