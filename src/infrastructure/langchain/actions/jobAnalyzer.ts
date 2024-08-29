import { AIJobInfo } from "@/domain/entities";
import { getLLM } from "../llm";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const formatInstructions = `Respond only in valid JSON. The JSON object you return should match the following schema:
{
  "title": "string | null",
  "company": "string | null",
  "salary": "string | null",
  "description": "string | null",
  "requirements": "string | null",
  "location": "string | null",
  "type": "remote" | "on-site" | "hybrid" | "unknown"
}`;

const outputParser = new JsonOutputParser<AIJobInfo>();

export async function LLMAnalyzeJobDescription(
  jobDescription: string
): Promise<AIJobInfo> {
  // Get the LLM instance
  const model = getLLM("groq");

  // Create the chat prompt template
  const prompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a Job Description Analyst. Your task is to analyze a job description and extract relevant information.
       Analyze the following job description and extract the relevant information.
       Do not make any assumptions. Only use the information provided in the text.
       If a piece of information is not present, use null for that field.
       For the 'type' field, only use 'remote', 'on-site', 'hybrid', or 'unknown'.

       Job Description:
       {jobDescription}

       Provide the output in the following JSON format:
       {format_instructions}`,
    ],
    ["human", "{jobDescription}"],
  ]).partial({
    format_instructions: formatInstructions,
  });

  console.log("prompt", prompt);
  // Create a chain to pipe the prompt through the model and then parse the output
  const chain = prompt.pipe(model).pipe(outputParser);

  // Run the chain and return the parsed result
  const result = await chain.invoke({ jobDescription });
  console.log("result", result);
  return result;
}
