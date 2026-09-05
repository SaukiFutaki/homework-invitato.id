import { defineRelations } from "drizzle-orm";

import { account, session, user } from "@/lib/db/schemas/account";
import { rsvp } from "@/lib/db/schemas/rsvp";
import { wish } from "@/lib/db/schemas/wish";

export const relations = defineRelations(
  { account, session, user, rsvp, wish },
  (r) => ({
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
      }),
    },
    user: {
      accounts: r.many.account(),
      sessions: r.many.session(),
    },
  }),
);
