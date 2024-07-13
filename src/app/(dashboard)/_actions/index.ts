import { getUserJobs } from "@/db/queries";

export const getUsersJobsAction = async (userId: string) => {
  const jobs = await getUserJobs(userId);
  return jobs;
};
