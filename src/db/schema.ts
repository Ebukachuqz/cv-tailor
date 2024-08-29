import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  type: text("type"),
  requirements: text("requirements"),
  rawText: text("rawText").notNull(),
  company: text("company"),
  location: text("location"),
  salary: text("salary"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  user_id: varchar("user_id", { length: 256 }).notNull(), // Clerk AUth ID
  file_id: integer("file_id").references(() => filesTable.id),
});

export const filesTable = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  filekey: text("filekey").notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(), // Clerk AUth ID
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export type SelectJob = typeof jobsTable.$inferSelect;
export type NewJob = typeof jobsTable.$inferInsert;
export type NewFile = typeof filesTable.$inferInsert;
export type UserId = (typeof jobsTable.$inferSelect)["user_id"];