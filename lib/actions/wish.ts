import { desc, eq } from "drizzle-orm";
import { z } from "zod/v4";

import { wish } from "@/lib/db/schemas/wish";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/lib/server/trpc";

const wishInput = z.object({
  name: z.string().trim().min(2).max(80),
  message: z.string().trim().min(2).max(500),
});

export const wishesRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) =>
    ctx.db
      .select({ id: wish.id, name: wish.name, message: wish.message })
      .from(wish)
      .where(eq(wish.status, "published"))
      .orderBy(desc(wish.createdAt)),
  ),
  submit: publicProcedure.input(wishInput).mutation(async ({ ctx, input }) => {
    const id = crypto.randomUUID();
    await ctx.db
      .insert(wish)
      .values({ id, ...input, status: "published", publishedAt: new Date() });
    return { id, success: true };
  }),
  adminList: adminProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.select().from(wish).orderBy(desc(wish.createdAt));
    return {
      rows,
      published: rows.filter((row) => row.status === "published").length,
      pending: rows.filter((row) => row.status === "pending").length,
      hidden: rows.filter((row) => row.status === "hidden").length,
    };
  }),
});
