import { dashboardRouter, rsvpRouter, wishesRouter } from "@/lib/actions";
import { createCallerFactory, createTRPCRouter } from "@/lib/server/trpc";

export const appRouter = createTRPCRouter({
  dashboard: dashboardRouter,
  rsvp: rsvpRouter,
  wishes: wishesRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
