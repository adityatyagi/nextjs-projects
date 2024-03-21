import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import postgres from "postgres";

export const connectionString: string = process.env.DATABASE_URL;

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
