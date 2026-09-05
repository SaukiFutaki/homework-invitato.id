import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        // Hanya dehydrate query yang SUDAH selesai (success/error).
        // JANGAN ikutkan pending — kalau prefetch server belum selesai,
        // dehydrate akan mengirim state "pending" dan menimpa cache client
        // yang sudah punya data (bikin halaman kehilangan data & refetch).
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query),
        shouldRedactErrors: () => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });