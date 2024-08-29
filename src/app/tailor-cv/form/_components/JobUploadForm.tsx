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
import LoadingModal from "@/components/shared/LoadingModal";
import { uploadCVAction } from "@/actions/tailorcvActions";
import React from "react";
import { Loader2 } from "lucide-react";
import { aiAnalyzeJobAction, saveJobToDbAction } from "@/actions/jobActions";

const JobUploadForm = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadingMessage, setUploadingMessage] = React.useState("");
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

  const onSubmit = async (data: FormSchema) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadingMessage(`Uploading file: ${uploadProgress}%`);
    const { jobDescription, file } = data;

    // upload and save Job
    try {
      const fileResponse = await uploadCVAction(
        file,
        (progress: number) => {
          setUploadProgress(progress);
        },
        (success: boolean) => {
          if (success) {
            setUploadingMessage(`Saving to DB...`);
          }
        }
      );

      // analyse Job description
      setUploadingMessage(`AI is analyzing job...`);
      const jobInfo = await aiAnalyzeJobAction(jobDescription);

      // save job to db
      setUploadingMessage(`Saving to DB...`);
      const jobDetails = {
        title: jobInfo.title,
        company: jobInfo.company,
        salary: jobInfo.salary,
        description: jobInfo.description,
        requirements: jobInfo.requirements,
        location: jobInfo.location,
        type: jobInfo.type,
        rawText: jobDescription,
        file_id: fileResponse.id,
        user_id: fileResponse.user_id,
      };

      const jobResponse = await saveJobToDbAction(jobDetails);
      console.log(jobResponse);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <LoadingModal isOpen={isUploading} message={uploadingMessage} />
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
          <Button className="" type="submit" disabled={isUploading}>
            Submit{" "}
            {isUploading ? (
              <span>
                <Loader2 className="ml-1 h-4 w-4 animate-spin" />
              </span>
            ) : null}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobUploadForm;
