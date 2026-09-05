import "server-only";

import { cache } from "react";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createQueryClient } from "./query-client";
import {
  createCallerFactory,
  createTRPCContext,
  createStaticTRPCContext,
} from "../server/trpc";
import { appRouter } from "../server/root";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(createQueryClient);

const createCaller = createCallerFactory(appRouter);

export const caller = createCaller(createTRPCContext);

export const staticCaller = createCaller(createStaticTRPCContext);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
