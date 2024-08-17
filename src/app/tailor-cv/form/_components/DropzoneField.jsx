import React from "react";
import { Cloud, File } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const DropzoneField = ({ onDrop, value }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop,
    maxSize: 1024 * 1024, // 1MB
    onDropRejected: (fileRejections) => {
      const file = fileRejections[0].file;
      if (fileRejections[0].errors[0].code === "file-invalid-type") {
        toast.error("Invalid file type. Please upload a PDF file.");
      } else if (fileRejections[0].errors[0].code === "file-too-large") {
        toast.error(
          "File is too large. Please upload a file smaller than 1MB."
        );
      }
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
          <p className="text-xs text-zinc-500">PDF (up to 1MB)</p>

          <input
            {...getInputProps()}
            type="file"
            id="dropzone-file"
            className="hidden"
          />
        </div>
      </div>
      {value ? (
        <div className="max-w-xs h-full bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
          <div className="px-3 py-2 grid place-items-center">
            <File className="h-4 w-4 text-blue-500" />
          </div>
          <div className="px-3 py-2 text-sm truncate">{value.name}</div>
        </div>
      ) : null}
    </div>
  );
};

export default DropzoneField;
