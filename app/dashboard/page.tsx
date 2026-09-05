"use client";
import { PageHeader } from "@/components/kumo/page-header/page-header";
import { Badge, Breadcrumbs, Button, LayerCard, Meter, Table } from "@cloudflare/kumo";
import { DownloadSimpleIcon, HouseIcon } from "@phosphor-icons/react";

const metrics = [
  { customValue: "128 / 174", label: "RSVP confirmed", value: 74 },
  { customValue: "57 messages", label: "Notes received", value: 57 },
  { customValue: "6 pending", label: "Needs review", value: 10 },
];

const weekly = [
  { day: "Mon", notes: 4, rsvp: 18 },
  { day: "Tue", notes: 7, rsvp: 24 },
  { day: "Wed", notes: 5, rsvp: 21 },
  { day: "Thu", notes: 9, rsvp: 31 },
  { day: "Fri", notes: 6, rsvp: 34 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-dvh bg-kumo-recessed px-4 py-4 sm:px-5">
      <PageHeader
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link icon={<HouseIcon size={16} />} href="/dashboard">
              Dashboard
            </Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>Overview</Breadcrumbs.Current>
          </Breadcrumbs>
        }
        title="Overview"
        description="A quick read of RSVP progress and incoming guest notes."
        tabs={[
          { label: "RSVP", value: "rsvp" },
          { label: "Notes", value: "notes" },
        ]}
        defaultTab="rsvp"
      >
        <Button
          size="sm"
          variant="secondary"
          icon={<DownloadSimpleIcon size={16} />}
        >
          Export
        </Button>
      </PageHeader>

      <div className="grid gap-4 py-4">
        <section className="grid gap-4 lg:grid-cols-3">
          {metrics.map((metric) => (
            <LayerCard key={metric.label}>
              <LayerCard.Primary>
                <Meter
                  customValue={metric.customValue}
                  label={metric.label}
                  value={metric.value}
                />
              </LayerCard.Primary>
            </LayerCard>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <LayerCard>
            <LayerCard.Secondary>Weekly activity</LayerCard.Secondary>
            <LayerCard.Primary>
              <div className="space-y-4">
                {weekly.map((item) => (
                  <div key={item.day} className="grid gap-2">te
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-kumo-default">
                        {item.day}
                      </span>
                      <span className="text-kumo-subtle">
                        {item.rsvp} RSVP / {item.notes} notes
                      </span>
                    </div>
                    <Meter
                      customValue={`${item.rsvp + item.notes} total`}
                      label={`${item.day} responses`}
                      showValue={false}
                      value={item.rsvp + item.notes}
                    />
                  </div>
                ))}
              </div>
            </LayerCard.Primary>
          </LayerCard>

          <LayerCard className="p-0">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Source</Table.Head>
                  <Table.Head>Status</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>RSVP form</Table.Cell>
                  <Table.Cell>
                    <Badge appearance="dot" variant="success">
                      Receiving
                    </Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Guest notes</Table.Cell>
                  <Table.Cell>
                    <Badge appearance="dot" variant="warning">
                      Review 6
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </LayerCard>
        </section>
      </div>
    </div>
  );
}
