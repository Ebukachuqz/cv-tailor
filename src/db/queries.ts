import { eq } from "drizzle-orm";
import { db } from ".";
import {
  NewFile,
  NewJob,
  SelectJob,
  UserId,
  filesTable,
  jobsTable,
} from "./schema";

export async function getUserJobs(userId: UserId): Promise<Array<SelectJob>> {
  return db.select().from(jobsTable).where(eq(jobsTable.user_id, userId));
}

export async function saveFiletoDB(fileDetails: NewFile) {
  return await db.insert(filesTable).values(fileDetails).returning();
}

export async function saveJobToDB(jobDetails: NewJob) {
  return await db.insert(jobsTable).values(jobDetails).returning();
}