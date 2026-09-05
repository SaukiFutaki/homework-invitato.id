import "server-only";

import { cache } from "react";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createQueryClient } from "./query-client";
import { createTRPCContext, createStaticTRPCContext } from "../server/trpc";
import { appRouter } from "../server/root";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(createQueryClient);

export const caller = appRouter.createCaller(createTRPCContext);

export const staticCaller = appRouter.createCaller(createStaticTRPCContext);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
