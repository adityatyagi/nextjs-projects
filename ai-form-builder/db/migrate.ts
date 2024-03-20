import postgres from "postgres";
import { connectionString } from "@/db";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

// Official
async function main() {
  const migrationClient = postgres(connectionString, { max: 1 });
  const db = drizzle(migrationClient);
  await migrate(db, { migrationsFolder: "./drizzle/migrations" });
  await migrationClient.end();
  console.log("****migrations successfull****");
  process.exit(0);
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
