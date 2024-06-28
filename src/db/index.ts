import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) throw new Error("Database Url not found!");

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);