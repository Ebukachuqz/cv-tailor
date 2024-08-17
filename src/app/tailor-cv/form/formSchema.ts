import { z } from "zod";

export const formSchema = z.object({
  jobDescription: z.string().min(1, {
    message: "Job description is required.",
  }),
  file: z
    .instanceof(File, { message: "A PDF file is required." })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed.",
    }),
});

export type FormSchema = z.infer<typeof formSchema>;
