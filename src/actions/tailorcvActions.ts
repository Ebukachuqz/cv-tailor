import { saveFiletoDB } from "@/db/queries";
import { UploadFileUseCase } from "@/usecases";
import { auth, getAuth } from "@clerk/nextjs/server";
import toast from "react-hot-toast";

export async function uploadCVAction(
  file: File,
  onProgress: (progress: number) => void,
  onCVUpload: (success: boolean) => void
) {
  const userId = "new";
  const filename = file.name;
  const filekey =
    "uploads/" + Date.now().toString() + file.name.replace(" ", "_");
  const uploadCVUseCase = new UploadFileUseCase();

  try {
    //   upload to s3
    const fileUrl = await uploadCVUseCase.execute(file, filekey, onProgress);
    onCVUpload(true);
    toast.success("File uploaded successfully");

    //   save to db
    const fileDetails = {
      name: filename,
      url: fileUrl,
      filekey,
      user_id: userId!,
    };
    await saveFiletoDB(fileDetails);
  } catch (error: any) {
    console.log(error);
    toast.error(`File upload failed: ${error.message}`);
    throw error;
  }
}
