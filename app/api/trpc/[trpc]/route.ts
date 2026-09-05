import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/lib/server/root";
import { createTRPCContext } from "@/lib/server/trpc";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
