"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFile) => {
      console.log(acceptedFile);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        {...getRootProps({
          className:
            "border h-45 m-4 border-dashed border-gray-300 rounded-lg w-full h-full",
        })}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
          <p className="mb-2 text-sm text-zinc-700">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-zinc-500">
            PDF (up to {false ? "16" : "4"}MB)
          </p>

          <input
            {...getInputProps()}
            type="file"
            id="dropzone-file"
            className="hidden"
          />
        </div>
      </div>
      {acceptedFiles && acceptedFiles[0] ? (
        <div className="max-w-xs h-full bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
          <div className="px-3 py-2 grid place-items-center">
            <File className="h-4 w-4 text-blue-500" />
          </div>
          <div className="px-3 py-2 text-sm truncate">
            {acceptedFiles[0].name}
          </div>
        </div>
      ) : null}
      {isUploading ? (
        <div className="w-full mt-4 max-w-xs mx-auto">
          <Progress value={uploadProgress} className="h-1 w-full bg-zinc-200" />
          {uploadProgress === 100 ? (
            <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Redirecting...
            </div>
          ) : null}
        </div>
      ) : null}
      {acceptedFiles && acceptedFiles[0] ? (
        <>
          <Button disabled={isUploading} className="mt-2">
            Confirm Upload
          </Button>
        </>
      ) : null}
    </div>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
