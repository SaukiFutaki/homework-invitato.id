import { cache } from "react";

import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod/v4";

export const createTRPCContext = cache(async () => ({}));

export const createStaticTRPCContext = createTRPCContext;

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
