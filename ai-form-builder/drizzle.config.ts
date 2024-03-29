import type { Config } from "drizzle-kit";
export default {
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://postgres.atzfrtsdypmiionriihl:1vqcjs2h3P0ZeMYU@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
  },
  verbose: true,
} satisfies Config;
