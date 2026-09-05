import { desc } from "drizzle-orm";
import { z } from "zod/v4";

import { RSVP_ATTENDANCE, RSVP_EVENT, rsvp } from "@/lib/db/schemas/rsvp";
import { adminProcedure, createTRPCRouter, publicProcedure } from "@/lib/server/trpc";

const rsvpInput = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(5).max(30),
  address: z.string().trim().min(2).max(240),
  email: z.email(),
  attendance: z.enum(RSVP_ATTENDANCE),
  event: z.enum(RSVP_EVENT).nullable(),
  guestCount: z.number().int().min(1).max(4),
}).refine(
  (value) =>
    (value.attendance === "attending" && value.event !== null) ||
    (value.attendance === "declining" && value.event === null),
  { message: "Event selection does not match attendance status." },
);

export const rsvpRouter = createTRPCRouter({
  submit: publicProcedure.input(rsvpInput).mutation(async ({ ctx, input }) => {
    const id = crypto.randomUUID();
    await ctx.db.insert(rsvp).values({ id, ...input });
    return { id, success: true };
  }),
  adminList: adminProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.select().from(rsvp).orderBy(desc(rsvp.createdAt));
    return {
      rows,
      attending: rows.filter((row) => row.attendance === "attending").length,
      declining: rows.filter((row) => row.attendance === "declining").length,
      guests: rows.reduce((total, row) => total + row.guestCount, 0),
    };
  }),
});
