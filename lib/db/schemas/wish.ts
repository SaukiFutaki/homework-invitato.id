import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const WISH_STATUS = ["pending", "published", "hidden"] as const;
export type WishStatus = (typeof WISH_STATUS)[number];

export const wish = sqliteTable(
  "wish",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    message: text("message").notNull(),
    status: text("status", { enum: WISH_STATUS }).default("pending").notNull(),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("wish_status_idx").on(table.status),
    index("wish_created_at_idx").on(table.createdAt),
    check(
      "wish_status_check",
      sql`${table.status} in ('pending', 'published', 'hidden')`,
    ),
  ],
);

export type Wish = typeof wish.$inferSelect;
export type NewWish = typeof wish.$inferInsert;
