"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "../formSchema";
import DropzoneField from "./DropzoneField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JobUploadForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const handleDrop = (
    acceptedFiles: File[],
    onChange: (file: File) => void
  ) => {
    if (acceptedFiles.length) {
      onChange(acceptedFiles[0]);
    }
  };

  const onSubmit = (data: FormSchema) => {
    console.log("Form data", data);
    // Handle form submission, such as sending the data to an API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the job description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Upload CV (PDF only)</FormLabel>
              <FormControl>
                <DropzoneField
                  onDrop={(files: File[]) => handleDrop(files, onChange)}
                  value={value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center justify-center">
          <Button className="" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobUploadForm;
