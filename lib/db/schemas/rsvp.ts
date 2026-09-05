import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const RSVP_ATTENDANCE = ["attending", "declining"] as const;
export type RsvpAttendance = (typeof RSVP_ATTENDANCE)[number];

export const RSVP_EVENT = ["ceremony", "reception", "both"] as const;
export type RsvpEvent = (typeof RSVP_EVENT)[number];

export const rsvp = sqliteTable(
  "rsvp",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    address: text("address").notNull(),
    email: text("email").notNull(),
    attendance: text("attendance", { enum: RSVP_ATTENDANCE }).notNull(),
    event: text("event", { enum: RSVP_EVENT }),
    guestCount: integer("guest_count").default(1).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("rsvp_attendance_idx").on(table.attendance),
    index("rsvp_created_at_idx").on(table.createdAt),
    check(
      "rsvp_attendance_check",
      sql`${table.attendance} in ('attending', 'declining')`,
    ),
    check(
      "rsvp_event_check",
      sql`${table.event} is null or ${table.event} in ('ceremony', 'reception', 'both')`,
    ),
    check(
      "rsvp_event_attendance_check",
      sql`(${table.attendance} = 'attending' and ${table.event} is not null) or (${table.attendance} = 'declining' and ${table.event} is null)`,
    ),
    check(
      "rsvp_guest_count_check",
      sql`${table.guestCount} between 1 and 4`,
    ),
  ],
);

export type Rsvp = typeof rsvp.$inferSelect;
export type NewRsvp = typeof rsvp.$inferInsert;
