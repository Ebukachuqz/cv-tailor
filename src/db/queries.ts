import { eq } from "drizzle-orm";
import { db } from ".";
import { SelectJob, UserId, jobsTable } from "./schema";

export async function getUserJobs(userId: UserId): Promise<Array<SelectJob>> {
  return db.select().from(jobsTable).where(eq(jobsTable.user_id, userId));
}
