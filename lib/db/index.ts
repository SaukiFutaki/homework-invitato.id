import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

import { relations } from "@/lib/db/schemas/relations";

config({ path: ".env" });

export const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  relations,
});
