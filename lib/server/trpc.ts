import { cache } from "react";

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod/v4";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const createTRPCContext = cache(async () => {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  return {
    db,
    session,
    user: session?.user,
  };
});

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

export const createStaticTRPCContext = cache(
  async (): Promise<TRPCContext> => ({
    db,
    session: null,
    user: undefined,
  }),
);

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? z.flattenError(error.cause) : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin =
    ctx.user.role === "admin" ||
    (adminEmail && ctx.user.email.toLowerCase() === adminEmail);

  if (!isAdmin) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }

  return next({ ctx });
});
