import { saveJobToDB } from "@/db/queries";
import { NewJob } from "@/db/schema";
import { AIJobInfo } from "@/domain/entities";
import { LLMAnalyzeJobDescription } from "@/infrastructure/langchain/actions/jobAnalyzer";

export const aiAnalyzeJobAction = async (
  jobText: string
): Promise<AIJobInfo> => {
  const jobInfo = await LLMAnalyzeJobDescription(jobText);
  return jobInfo;
};

export const saveJobToDbAction = async (jobInfo: NewJob) => {
  // Save job to database
  await saveJobToDB(jobInfo);
};
