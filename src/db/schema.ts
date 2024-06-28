import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company"),
  location: text("location"),
  salary: text("salary"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  deleted_at: timestamp("deleted_at"),
  user_id: varchar("user_id", { length: 256 })
    .notNull()
    .references(() => users.id),
  file_id: integer("file_id").references(() => files.id),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  filekey: text("filekey").notNull(),
  user_id: varchar("user_id", { length: 256 })
    .notNull()
    .references(() => users.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
