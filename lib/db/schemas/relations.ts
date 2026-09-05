import { defineRelations } from "drizzle-orm";

import { account, session, user } from "@/lib/db/schemas/account";

export const relations = defineRelations({ account, session, user }, (r) => ({
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
}));
