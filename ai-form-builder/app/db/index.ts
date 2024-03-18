import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres.atzfrtsdypmiionriihl:1vqcjs2h3P0ZeMYU@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
