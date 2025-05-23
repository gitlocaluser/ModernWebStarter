import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // Hashed with bcrypt
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});