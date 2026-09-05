"use client"
import { PageHeader } from "@/components/kumo/page-header/page-header";
import { Badge, Breadcrumbs, Button, LayerCard, Table } from "@cloudflare/kumo";
import { DownloadSimpleIcon, HouseIcon, PlusIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

interface Metric {
  label: string;
  value: string;
}

interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: ReactNode;
}

export function AdminPage({
  action = "Add record",
  columns,
  current,
  description,
  metrics,
  rows,
  title,
}: {
  action?: string;
  columns: TableColumn[];
  current: string;
  description: string;
  metrics: Metric[];
  rows: TableRow[];
  title: string;
}) {
  return (
    <div className="min-h-dvh bg-kumo-recessed px-4 py-4 sm:px-5">
      <PageHeader
        className="w-full"
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link icon={<HouseIcon size={16} />} href="/dashboard">
              Dashboard
            </Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>{current}</Breadcrumbs.Current>
          </Breadcrumbs>
        }
        title={title}
        description={description}
        tabs={[
          { label: "RSVP", value: "rsvp" },
          { label: "Notes", value: "notes" },
        ]}
        defaultTab={current.toLowerCase() === "notes" ? "notes" : "rsvp"}
      >
        <Button
          size="sm"
          variant="secondary"
          icon={<DownloadSimpleIcon size={16} />}
        >
          Export
        </Button>
        <Button size="sm" variant="primary" icon={<PlusIcon size={16} />}>
          {action}
        </Button>
      </PageHeader>

      <div className="grid w-full gap-4 py-4">
        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <LayerCard key={metric.label}>
              <LayerCard.Secondary>{metric.label}</LayerCard.Secondary>
              <LayerCard.Primary>
                <p className="text-3xl font-semibold text-kumo-strong">
                  {metric.value}
                </p>
              </LayerCard.Primary>
            </LayerCard>
          ))}
        </section>

        <LayerCard className="p-0">
          <Table>
            <Table.Header>
              <Table.Row>
                {columns.map((column) => (
                  <Table.Head key={column.key}>{column.label}</Table.Head>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row, index) => (
                <Table.Row key={index}>
                  {columns.map((column) => (
                    <Table.Cell key={column.key}>{row[column.key]}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </LayerCard>
      </div>
    </div>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  const value = String(children).toLowerCase();
  const variant = value.includes("pending")
    ? "warning"
    : value.includes("unable")
      ? "neutral"
      : "success";

  return (
    <Badge appearance="dot" variant={variant}>
      {children}
    </Badge>
  );
}
