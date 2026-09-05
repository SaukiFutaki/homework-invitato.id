import { desc } from "drizzle-orm";

import { rsvp } from "@/lib/db/schemas/rsvp";
import { wish } from "@/lib/db/schemas/wish";
import { adminProcedure, createTRPCRouter } from "@/lib/server/trpc";

export const dashboardRouter = createTRPCRouter({
  overview: adminProcedure.query(async ({ ctx }) => {
    const [rsvpRows, wishRows] = await Promise.all([
      ctx.db.select().from(rsvp).orderBy(desc(rsvp.createdAt)),
      ctx.db.select().from(wish).orderBy(desc(wish.createdAt)),
    ]);
    return {
      email: ctx.user.email,
      rsvpRows,
      wishRows,
      totalRsvp: rsvpRows.length,
      attending: rsvpRows.filter((row) => row.attendance === "attending").length,
      totalWishes: wishRows.length,
      pendingWishes: wishRows.filter((row) => row.status === "pending").length,
    };
  }),
});
