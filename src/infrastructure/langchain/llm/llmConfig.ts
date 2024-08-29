import { ChatGroq } from "@langchain/groq";

export function getLLM(type = "groq") {
  switch (type.toLowerCase()) {
    case "groq":
      return new ChatGroq({
        model: "mixtral-8x7b-32768",
        temperature: 0,
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      });
    default:
      throw new Error(`Unsupported LLM type: ${type}`);
  }
}
