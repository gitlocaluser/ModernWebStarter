import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "./schema";

const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(client, { schema: { users } });