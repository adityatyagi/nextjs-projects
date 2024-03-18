import type { Config } from "drizzle-kit";
export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://postgres.atzfrtsdypmiionriihl:1vqcjs2h3P0ZeMYU@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
  },
} satisfies Config;
